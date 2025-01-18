import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { format, isBefore, isAfter } from 'date-fns';
import { post, get, patch } from '../utils/api';
import { addTripUrl, showTripUrl, getTripsUrl, deleteTripUrl, getParticipantsUrl, joinTripUrl } from '../utils/routesApi';
import { homeRoute } from '../utils/routes';
import { enumTravelStatus } from '../enums/enumTravelStatus'


export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const addTrip = async ({ title, destination, startDate, endDate, imagePreview }) => {
    try {
      const { data } = await post(addTripUrl, { title, destination, startDate, endDate, imagePreview });
      navigate(homeRoute);
      return { success: true, data }; 
    } catch (error) {
      if (error.status === 401) {
        enqueueSnackbar('Credenciais inválidas.', { variant: 'error' });
      } else if (error.status === 400) {
        const parsedError = JSON.parse(error.response.data.error);

        const errorMsg = Object.keys(parsedError).length 
        ? parsedError[Object.keys(parsedError)[0]][0] 
        : "Revise os dados informados e tente novamente.";

        enqueueSnackbar(errorMsg, { variant: 'error' });
      } else {
        enqueueSnackbar('Ocorreu um problema inesperado. Tente novamente mais tarde.', { variant: 'error' });
      }
      return { success: false };
    }
  };

  const getTrips = async () => {
    try {
        const { data } = await get(getTripsUrl);
        return data; 
    } catch (error) {
        return null;
    }
  };

  const joinTrip = async (id, trip = {}) => {
    try {
      const { data } = await post(`${joinTripUrl}/${id}`, trip);
      return data; 
    } catch (error) {
      return null;
    }
  };

  const showTrip = async (id) => {
    try {
      const { data } = await get(`${showTripUrl}/${id}`);

      if (data) {
        let status = null;
        const now = new Date();
  
        if (isBefore(now, new Date(data.start_date))) {
          status = enumTravelStatus.planned;
        } else if (isAfter(now, new Date(data.end_date))) {
          status = enumTravelStatus.finished;
        } else {
          status = enumTravelStatus.progress;
        }
  
        return { ...data, status };
      }
    } catch (error) {
      return null;
    }
  };

  const getParticipants = async (id) => {
    try {
      const { data } = await get(`${getParticipantsUrl}/${id}`);
      return data; 
    } catch (error) {
      return null;
    }
  };

  const deleteTrip = async (id) => {
    try {
      const data = {
        deleted_at: new Date().toISOString(),
      };
      const { data: responseData } = await patch(`${deleteTripUrl}/${id}`, data);
      return { success: true}; 
    } catch (error) {
      return { success: false };
    }
  };

  return (
    <UserContext.Provider value={{ user, addTrip, showTrip, deleteTrip, getTrips, getParticipants, joinTrip }}>
      {children}
    </UserContext.Provider>
  );
};
