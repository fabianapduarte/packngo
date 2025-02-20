import { createContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'

import { get, patch, post } from '../utils/api'
import { cookies } from '../utils/cookies'
import { loginUrl, logoutUrl, registerUrl, userProfileUrl, userUrl } from '../utils/routesApi'
import { homeRoute, loginRoute, registerRoute } from '../utils/routes'

export const AuthContext = createContext({})

export const UserContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    const authToken = cookies.get('token')
    const publicRoutes = [loginRoute, registerRoute]

    if (!authToken) {
      navigate(loginRoute)
    } else if (!publicRoutes.includes(location.pathname)) {
      getUser()
    }
  }, [])

  const login = async ({ email, password }) => {
    cookies.remove('token')

    try {
      setLoading(true)
      const { data } = await post(loginUrl, { email, password })
      const { user, token } = data
      const authToken = { token, userId: user.id }
      setUser(user)
      cookies.set('token', authToken)
      navigate(homeRoute)
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
      const authToken = { token, userId: user.id }
      setUser(user)
      cookies.set('token', authToken)
      navigate(homeRoute)
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
      navigate(loginRoute)
    }
  }

  const getUser = async () => {
    try {
      const authToken = cookies.get('token')
      if (!authToken) navigate(homeRoute)

      const url = userUrl(authToken.userId)
      const { data } = await get(url)
      setUser(data)
    } catch (error) {
      enqueueSnackbar('Erro ao carregar seus dados. Tente novamente mais tarde.', { variant: 'error' })
      cookies.remove('token')
      navigate(loginRoute)
    }
  }

  const getUserId = async () => {
    try {
      return user.id
    } catch (error) {
      enqueueSnackbar('Erro ao buscar usuário. Tente novamente mais tarde.', { variant: 'error' })
      return null
    }
  }

  const updateUser = async ({ name, password, passwordConfirmation }) => {
    try {
      setLoading(true)

      const newData = {}
      if (name) newData.name = name
      if (password && passwordConfirmation) {
        newData.password = password
        newData.password_confirmation = passwordConfirmation
      }

      const url = userUrl(user.id)
      const { data } = await patch(url, newData)

      setUser({ ...data.user })
      enqueueSnackbar('Informações salvas com sucesso!', { variant: 'success' })
    } catch (error) {
      if (error.status === 401) {
        enqueueSnackbar('Você não está autenticado. Faça login e tente novamente.', { variant: 'error' })
        navigate(loginRoute)
      } else if (error.status === 400) {
        enqueueSnackbar('Revise os dados informados e tente novamente.', { variant: 'error' })
      } else {
        enqueueSnackbar('Ocorreu um problema inesperado. Tente novamente mais tarde.', { variant: 'error' })
      }
    } finally {
      setLoading(false)
    }
  }

  const updateUserImage = async ({ file, onLoading, onSuccess, onError }) => {
    onLoading()

    try {
      const form = new FormData()
      form.append('image', file)

      const url = userProfileUrl(user.id)
      const { data } = await post(url, form)

      setUser({ ...data.user })
      onSuccess(data.user.image_path)
      enqueueSnackbar('Imagem do perfil atualizada com sucesso!', { variant: 'success' })
    } catch (error) {
      onError()
      if (error.status === 401) {
        enqueueSnackbar('Você não está autenticado. Faça login e tente novamente.', { variant: 'error' })
        navigate(loginRoute)
      } else {
        enqueueSnackbar('Ocorreu um problema inesperado. Tente novamente mais tarde.', { variant: 'error' })
      }
    }
  }

  return (
    <AuthContext.Provider value={{ login, logout, register, loading, updateUser, updateUserImage, getUserId }}>
      <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
    </AuthContext.Provider>
  )
}
