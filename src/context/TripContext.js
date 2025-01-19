import { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { post, get, del } from '../utils/api'
import { joinTripUrl, previewTripUrl, tripsUrl, tripUrl } from '../utils/routesApi'
import { tripRoute } from '../utils/routes'
import { getTripStatus } from '../utils/getTripStatus'

export const TripContext = createContext({})

export const TripProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const addTrip = async ({ title, destination, startDate, endDate, image }) => {
    try {
      setLoading(true)

      const form = new FormData()
      form.append('title', title)
      form.append('destination', destination)
      form.append('startDate', startDate)
      form.append('endDate', endDate)
      if (image) form.append('image', image)

      const { data } = await post(tripsUrl, form)

      enqueueSnackbar('Viagem criada com sucesso!', { variant: 'success' })
      navigate(tripRoute(data.trip.id))
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
    } finally {
      setLoading(false)
    }
  }

  const previewTrip = async (code) => {
    try {
      setLoading(true)

      const url = previewTripUrl(code)
      const { data } = await get(url)
      const status = getTripStatus(data.start_date, data.end_date)
      return { ...data, status }
    } catch (error) {
      if (error.status === 401) {
        enqueueSnackbar('Credenciais inválidas.', { variant: 'error' })
      } else if (error.status === 404) {
        enqueueSnackbar('Viagem não encontrada. Verifique o código e tente novamente.', { variant: 'error' })
      } else {
        enqueueSnackbar('Ocorreu um problema inesperado. Tente novamente mais tarde.', { variant: 'error' })
      }
      return null
    } finally {
      setLoading(false)
    }
  }

  const getTrips = async () => {
    try {
      setLoading(true)
      const { data } = await get(tripsUrl)
      return data
    } catch (error) {
      setLoading(false)
      if (error.status === 401) {
        enqueueSnackbar('Credenciais inválidas.', { variant: 'error' })
      } else {
        enqueueSnackbar('Ocorreu um problema inesperado. Tente novamente mais tarde.', { variant: 'error' })
      }
      return null
    }
  }

  const joinTrip = async (id) => {
    try {
      setLoading(true)
      const url = joinTripUrl(id)
      const { data } = await post(url)
      enqueueSnackbar('Sucesso ao entrar no grupo da viagem!', { variant: 'success' })
      navigate(tripRoute(data.trip_id))
    } catch (error) {
      setLoading(false)
      if (error.status === 401) {
        enqueueSnackbar('Credenciais inválidas.', { variant: 'error' })
      } else {
        enqueueSnackbar('Ocorreu um problema inesperado. Tente novamente mais tarde.', { variant: 'error' })
      }
    }
  }

  const showTrip = async (id) => {
    try {
      setLoading(true)
      const url = tripUrl(id)
      const { data } = await get(url)

      if (data) {
        const status = getTripStatus(data.start_date, data.end_date)
        return { ...data, status }
      }
    } catch (error) {
      setLoading(false)
      return null
    }
  }

  const deleteTrip = async (id) => {
    try {
      setLoading(true)
      const url = tripUrl(id)
      await del(url)
      return { success: true }
    } catch (error) {
      setLoading(false)
      if (error.status === 401) {
        enqueueSnackbar('Credenciais inválidas.', { variant: 'error' })
      } else {
        enqueueSnackbar('Ocorreu um problema inesperado. Tente novamente mais tarde.', { variant: 'error' })
      }
      return { success: false }
    }
  }

  return (
    <TripContext.Provider value={{ loading, addTrip, showTrip, deleteTrip, getTrips, joinTrip, previewTrip }}>
      {children}
    </TripContext.Provider>
  )
}
