import { createContext } from 'react'
import { useSnackbar } from 'notistack'
import { post, get, put, del } from '../utils/api'
import { eventsUrl, eventUrl } from '../utils/routesApi'

export const EventContext = createContext({})

export const EventProvider = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar()

  const addEvent = async ({
    title,
    description,
    destination,
    startDate,
    endDate,
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
      form.append('startDatetime', `${startDate} ${startDateTime}`);
      form.append('endDatetime', `${startDate} ${endDateTime}`);
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

  return (
    <EventContext.Provider
      value={{
        addEvent,
        getEvents,
        deleteEvent
      }}
    >
      {children}
    </EventContext.Provider>
  )
}
