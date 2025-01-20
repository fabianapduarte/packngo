import { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { post, get, del } from '../utils/api'
import { listsUrl, deleteListsUrl } from '../utils/routesApi'
import { tripRoute } from '../utils/routes'


export const ListsContext = createContext({})

export const ListsProvider = ({ children }) => {  
  
  const { enqueueSnackbar } = useSnackbar()

  const addLists = async ({ title, is_checked, id_trip }) => {
    try {      
      const form = new FormData()
      form.append('title', title)
      form.append('is_checked', is_checked)
      form.append('id_trip', id_trip)    

      const { data } = await post(listsUrl(id_trip), form)

      //enqueueSnackbar('Item criada com sucesso!', { variant: 'success' })      
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
    }
  }


  const getLists = async (id_trip) => {
    try {      
      const { data } = await get(listsUrl(id_trip))    
      console.log(data)  
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
  

  const deleteLists = async (id,id_trip) => {
    try {      
      const url = deleteListsUrl(id_trip,id)
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

  return (
    <ListsContext.Provider value={{ addLists, deleteLists, getLists}}>
      {children}
    </ListsContext.Provider>
  )
}
