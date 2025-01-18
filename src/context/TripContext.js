import { createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { isBefore, isAfter } from 'date-fns'
import { post, get, del } from '../utils/api'
import { getTripParticipantsUrl, joinTripUrl, tripsUrl, tripUrl } from '../utils/routesApi'
import { homeRoute } from '../utils/routes'
import { enumTravelStatus } from '../enums/enumTravelStatus'

export const TripContext = createContext({})

export const TripProvider = ({ children }) => {
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const addTrip = async ({ title, destination, startDate, endDate, imagePreview }) => {
    try {
      const { data } = await post(tripsUrl, { title, destination, startDate, endDate, imagePreview })
      navigate(homeRoute)
      return { success: true, data }
    } catch (error) {
      if (error.status === 401) {
        enqueueSnackbar('Credenciais inválidas.', { variant: 'error' })
      } else if (error.status === 400) {
        const parsedError = JSON.parse(error.response.data.error)

        const errorMsg = Object.keys(parsedError).length
          ? parsedError[Object.keys(parsedError)[0]][0]
          : 'Revise os dados informados e tente novamente.'

        enqueueSnackbar(errorMsg, { variant: 'error' })
      } else {
        enqueueSnackbar('Ocorreu um problema inesperado. Tente novamente mais tarde.', { variant: 'error' })
      }
      return { success: false }
    }
  }

  const getTrips = async () => {
    try {
      const { data } = await get(tripsUrl)
      return data
    } catch (error) {
      return null
    }
  }

  const joinTrip = async (id, trip = {}) => {
    try {
      const url = joinTripUrl(id)
      const { data } = await post(url, trip)
      return data
    } catch (error) {
      return null
    }
  }

  const showTrip = async (id) => {
    try {
      const url = tripUrl(id)
      const { data } = await get(url)

      if (data) {
        let status = null
        const now = new Date()

        if (isBefore(now, new Date(data.start_date))) {
          status = enumTravelStatus.planned
        } else if (isAfter(now, new Date(data.end_date))) {
          status = enumTravelStatus.finished
        } else {
          status = enumTravelStatus.progress
        }

        return { ...data, status }
      }
    } catch (error) {
      return null
    }
  }

  const getParticipants = async (id) => {
    try {
      const url = getTripParticipantsUrl(id)
      const { data } = await get(url)
      return data
    } catch (error) {
      return null
    }
  }

  const deleteTrip = async (id) => {
    try {
      const url = tripUrl(id)
      await del(url)
      return { success: true }
    } catch (error) {
      return { success: false }
    }
  }

  return (
    <TripContext.Provider value={{ addTrip, showTrip, deleteTrip, getTrips, getParticipants, joinTrip }}>
      {children}
    </TripContext.Provider>
  )
}
