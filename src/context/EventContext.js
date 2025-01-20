import { createContext } from 'react'
import { useSnackbar } from 'notistack'
import { post, get, patch, del } from '../utils/api'
import { eventsUrl, eventUrl, joinEventUrl, leaveEventUrl } from '../utils/routesApi'

export const EventContext = createContext({})

export const EventProvider = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar()

  const addEvent = async ({
    title,
    description,
    destination,
    startDate,
    startDateTime,
    endDateTime,
    cost,
    shareCost,
    idCategory,
    id,
    handleSuccess,
  }) => {
    try {
      const form = new FormData()
      form.append('title', title)
      if (description) form.append('description', description)
      form.append('destination', destination)
      form.append('startDatetime', `${startDate} ${startDateTime}`)
      form.append('endDatetime', `${startDate} ${endDateTime}`)
      form.append('cost', cost)
      form.append('shareCost', shareCost ? 1 : 0)
      form.append('id', id)
      form.append('idCategory', Number(idCategory))

      const url = eventsUrl(id)
      await post(url, form)

      enqueueSnackbar('Evento cadastrado com sucesso!', { variant: 'success' })
      handleSuccess()
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
    }
  }

  const getEvents = async (id) => {
    try {
      const url = eventsUrl(id)
      const { data } = await get(url)
      return data
    } catch (error) {
      if (error.status === 401) {
        enqueueSnackbar('Credenciais inválidas.', { variant: 'error' })
      } else {
        enqueueSnackbar('Ocorreu um problema inesperado ao obter eventos.', { variant: 'error' })
      }
      return null
    }
  }

  const editEvent = async ({
    title,
    description,
    destination,
    startDate,
    startDateTime,
    endDateTime,
    cost,
    shareCost,
    idCategory,
    idEvent,
    id,
    handleSuccess,
  }) => {
    try {
      const newData = {}
      newData.title = title
      newData.description = description
      newData.destination = destination
      newData.startDatetime = startDate + ' ' + startDateTime
      newData.endDatetime = startDate + ' ' + endDateTime
      newData.cost = cost
      newData.shareCost = shareCost ? 1 : 0
      newData.idCategory = Number(idCategory)

      const url = eventUrl(id, idEvent)

      await patch(url, newData)
      enqueueSnackbar('Evento editado', { variant: 'success' })
      handleSuccess()
      return { success: true }
    } catch (error) {
      if (error.status === 401) {
        enqueueSnackbar('Credenciais inválidas.', { variant: 'error' })
      } else {
        enqueueSnackbar('Ocorreu um problema inesperado. Tente novamente mais tarde.', { variant: 'error' })
      }
      return { success: false }
    }
  }

  const deleteEvent = async (id_trip, id) => {
    try {
      const url = eventUrl(id_trip, id)
      await del(url)
      enqueueSnackbar('Evento excluído', { variant: 'success' })
      return { success: true }
    } catch (error) {
      if (error.status === 401) {
        enqueueSnackbar('Credenciais inválidas.', { variant: 'error' })
      } else {
        enqueueSnackbar('Ocorreu um problema inesperado. Tente novamente mais tarde.', { variant: 'error' })
      }
      return { success: false }
    }
  }

  const joinEvent = async (idTrip, idEvent) => {
    try {
      const url = joinEventUrl(idTrip, idEvent)
      await post(url)
      enqueueSnackbar('Sua participação no evento foi confirmada com sucesso.', { variant: 'success' })
      return { success: true }
    } catch (error) {
      if (error.status === 401) {
        enqueueSnackbar('Credenciais inválidas.', { variant: 'error' })
      } else {
        enqueueSnackbar('Ocorreu um problema inesperado ao obter eventos.', { variant: 'error' })
      }
      return { success: false }
    }
  }

  const leaveEvent = async (idTrip, idEvent) => {
    try {
      const url = leaveEventUrl(idTrip, idEvent)
      await post(url)
      enqueueSnackbar('Sua participação no evento foi cancelada com sucesso.', { variant: 'success' })
      return { success: true }
    } catch (error) {
      if (error.status === 401) {
        enqueueSnackbar('Credenciais inválidas.', { variant: 'error' })
      } else {
        enqueueSnackbar('Ocorreu um problema inesperado ao obter eventos.', { variant: 'error' })
      }
      return { success: false }
    }
  }

  return (
    <EventContext.Provider
      value={{
        addEvent,
        getEvents,
        editEvent,
        deleteEvent,
        joinEvent,
        leaveEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  )
}
