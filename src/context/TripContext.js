import { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { post, get, patch, del } from '../utils/api'
import {
  joinTripUrl,
  fetchTripUrl,
  tripsUrl,
  tripUrl,
  leaveTripUrl,
  editTripUrl,
  tripProfileUrl,
} from '../utils/routesApi'
import { homeRoute, tripRoute } from '../utils/routes'

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
      const url = fetchTripUrl(code)
      const { data } = await get(url)
      return data
    } catch (error) {
      if (error.status === 401) {
        enqueueSnackbar('Credenciais inválidas.', { variant: 'error' })
      } else if (error.status === 404) {
        enqueueSnackbar('Viagem não encontrada. Verifique o código e tente novamente.', { variant: 'error' })
      } else {
        enqueueSnackbar('Ocorreu um problema inesperado. Tente novamente mais tarde.', { variant: 'error' })
      }
      return null
    }
  }

  const getTrips = async () => {
    try {
      setLoading(true)
      const { data } = await get(tripsUrl)
      return data
    } catch (error) {
      if (error.status === 401) {
        enqueueSnackbar('Credenciais inválidas.', { variant: 'error' })
      } else {
        enqueueSnackbar('Ocorreu um problema inesperado. Tente novamente mais tarde.', { variant: 'error' })
      }
      return null
    } finally {
      setLoading(false)
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
      if (error.status === 401) {
        enqueueSnackbar('Credenciais inválidas.', { variant: 'error' })
      } else if (error.status === 400) {
        const errorMessage = error.response.data.error
        enqueueSnackbar(errorMessage, { variant: 'warning' })
      } else {
        enqueueSnackbar('Ocorreu um problema inesperado. Tente novamente mais tarde.', { variant: 'error' })
      }
    } finally {
      setLoading(false)
    }
  }

  const showTrip = async (id) => {
    try {
      setLoading(true)
      const url = tripUrl(id)
      const { data } = await get(url)
      return data
    } catch (error) {
      navigate(homeRoute)
      return null
    } finally {
      setLoading(false)
    }
  }

  const deleteTrip = async (id) => {
    try {
      setLoading(true)
      const url = tripUrl(id)
      await del(url)
      return { success: true }
    } catch (error) {
      if (error.status === 401) {
        enqueueSnackbar('Credenciais inválidas.', { variant: 'error' })
      } else {
        enqueueSnackbar('Ocorreu um problema inesperado. Tente novamente mais tarde.', { variant: 'error' })
      }
      return { success: false }
    } finally {
      setLoading(false)
    }
  }

  const leaveTrip = async (id) => {
    try {
      const url = leaveTripUrl(id)
      await del(url)
      return { success: true }
    } catch (error) {
      if (error.status === 400) {
        const errorMessage = error.response.data.error
        enqueueSnackbar(errorMessage, { variant: 'warning' })
      } else {
        enqueueSnackbar('Ocorreu um problema inesperado. Tente novamente mais tarde.', { variant: 'error' })
      }
      return { success: false }
    } finally {
      setLoading(false)
    }
  }

  const editTrip = async ({ title, destination, startDate, endDate, id }) => {
    try {
      const url = editTripUrl(id)

      const newData = {}
      newData.title = title
      newData.destination = destination
      newData.startDate = startDate
      newData.endDate = endDate

      await patch(url, newData)
      return { success: true }
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
    } finally {
      setLoading(false)
    }
  }

  const editTripImage = async ({ file, id, onSuccess }) => {
    try {
      const form = new FormData()
      form.append('image', file)

      const url = tripProfileUrl(id)
      const { data } = await post(url, form)
      onSuccess(data.trip.image_path)
      enqueueSnackbar('Imagem da viagem atualizada com sucesso!', { variant: 'success' })
    } catch (error) {
      if (error.status === 401) {
        enqueueSnackbar('Credenciais inválidas.', { variant: 'error' })
      } else {
        enqueueSnackbar('Ocorreu um problema inesperado. Tente novamente mais tarde.', { variant: 'error' })
      }
    }
  }

  return (
    <TripContext.Provider
      value={{
        loading,
        addTrip,
        showTrip,
        deleteTrip,
        getTrips,
        joinTrip,
        leaveTrip,
        previewTrip,
        editTrip,
        editTripImage,
      }}
    >
      {children}
    </TripContext.Provider>
  )
}
