import { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { post, get, patch, del } from '../utils/api'
import {
  eventsUrl
} from '../utils/routesApi'
import { homeRoute, tripRoute } from '../utils/routes'

export const EventContext = createContext({})

export const EventProvider = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar()

  const addEvent = async ({title, description, destination, startDate, endDate, cost, shareCost, id}) => {
    try {
      const form = new FormData()
      form.append('title', title)
      form.append('description', description)
      form.append('destination', destination)
      form.append('startDate', startDate)
      form.append('endDate', endDate)
      form.append('cost', cost)
      form.append('shareCost', shareCost)
      form.append('id', id)

      const url = eventsUrl(id)
      const { data } = await post(url, form)

      enqueueSnackbar('Evento cadastrado com sucesso!', { variant: 'success' })
      //navigate(tripRoute(data.trip.id))
      return data
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

  return (
    <EventContext.Provider
      value={{
        addEvent,
        getEvents
      }}
    >
      {children}
    </EventContext.Provider>
  )
}
