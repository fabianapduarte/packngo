import { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'

import { post } from '../utils/api'
import { cookies } from '../utils/cookies'
import { loginUrl, logoutUrl, registerUrl } from '../utils/routesApi'

export const AuthContext = createContext({})

export const UserContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const login = async ({ email, password }) => {
    cookies.remove('token')

    try {
      setLoading(true)
      const { data } = await post(loginUrl, { email, password })
      const { user, token } = data
      setUser(user)
      cookies.set('token', token)
      navigate('/home')
    } catch (error) {
      if (error.status === 401) {
        enqueueSnackbar('Credenciais inválidas.', { variant: 'error' })
      } else if (error.status === 400) {
        enqueueSnackbar('Revise os dados informados e tente novamente.', { variant: 'error' })
      } else {
        enqueueSnackbar('Ocorreu um problema inesperado. Tente novamente mais tarde.', { variant: 'error' })
      }
    } finally {
      setLoading(false)
    }
  }

  const register = async ({ name, email, password, passwordConfirmation }) => {
    cookies.remove('token')

    try {
      setLoading(true)
      const { data } = await post(registerUrl, {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      })
      const { user, token } = data
      setUser(user)
      cookies.set('token', token)
      navigate('/home')
    } catch (error) {
      if (error.status === 400) {
        enqueueSnackbar('Revise os dados informados e tente novamente.', { variant: 'error' })
      } else {
        enqueueSnackbar('Ocorreu um problema inesperado. Tente novamente mais tarde.', { variant: 'error' })
      }
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      await post(logoutUrl)
      setUser(null)
      cookies.remove('token')
    } catch (error) {
      enqueueSnackbar('Ocorreu um problema inesperado. Tente novamente mais tarde.', { variant: 'error' })
    } finally {
      navigate('/')
    }
  }

  const updateUser = (newUser) => {
    console.log('updateUser')
    setUser({ ...user, newUser })
  }

  return (
    <AuthContext.Provider value={{ login, logout, register, updateUser, loading }}>
      <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
    </AuthContext.Provider>
  )
}
