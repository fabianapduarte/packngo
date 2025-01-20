import { createContext } from 'react'
import { useSnackbar } from 'notistack'
import { post, get, del, patch } from '../utils/api'
import { listsUrl, deleteItemUrl, checkItemUrl } from '../utils/routesApi'

export const ListsContext = createContext({})

export const ListsProvider = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar()

  const addItem = async ({ idTrip, item }) => {
    try {
      const { data } = await post(listsUrl(idTrip), { item })
      return { success: true, newItem: data }
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

  const checkItem = async ({ idTrip, idItem }) => {
    try {
      const { data } = await patch(checkItemUrl(idTrip, idItem))
      return { success: true, itemUpdated: data }
    } catch (error) {
      if (error.status === 401) {
        enqueueSnackbar('Credenciais inválidas.', { variant: 'error' })
      } else {
        enqueueSnackbar('Ocorreu um problema inesperado. Tente novamente mais tarde.', { variant: 'error' })
      }
      return { success: false }
    }
  }

  const getList = async (idTrip) => {
    try {
      const { data } = await get(listsUrl(idTrip))
      return data
    } catch (error) {
      if (error.status === 401) {
        enqueueSnackbar('Credenciais inválidas.', { variant: 'error' })
      } else {
        enqueueSnackbar('Ocorreu um problema inesperado. Tente novamente mais tarde.', { variant: 'error' })
      }
      return null
    }
  }

  const deleteItem = async ({ idItem, idTrip }) => {
    try {
      const url = deleteItemUrl(idTrip, idItem)
      await del(url)
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

  return <ListsContext.Provider value={{ addItem, deleteItem, getList, checkItem }}>{children}</ListsContext.Provider>
}
