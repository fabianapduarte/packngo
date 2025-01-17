import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { post, get } from '../utils/api';
import { addTripUrl, showTripUrl } from '../utils/routesApi';
import { homeRoute } from '../utils/routes';

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [trip, setTrip] = useState(null);
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

  const showTrip = async (id) => {
    try {
        const { data } = await get(`${showTripUrl}/${id}`);
        return { success: true, trip: data }; 
    } catch (error) {
        return { success: false };
    }
  };


  const deleteTrip = async (id) => {
    try {
        const { data } = await delete(`${showTripUrl}/${id}`);
        return { success: true}; 
    } catch (error) {
        return { success: false };
    }
  };

  return (
    <UserContext.Provider value={{ user, addTrip, showTrip, deleteTrip }}>
      {children}
    </UserContext.Provider>
  );
};
