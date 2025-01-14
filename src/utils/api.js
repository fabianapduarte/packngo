import axios from 'axios'
import { baseUrl } from './routesApi'
import { cookies } from './cookies'

export const post = (url, data) => {
  const fullUrl = baseUrl + url
  const token = cookies.get('token')

  return axios.post(fullUrl, data, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
}

export const get = (url) => {
  const fullUrl = baseUrl + url
  const token = cookies.get('token')

  return axios.get(fullUrl, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
}

export const patch = (url, data) => {
  const fullUrl = baseUrl + url
  const token = cookies.get('token')

  return axios.patch(fullUrl, data, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
}

export const del = (url) => {
  const fullUrl = baseUrl + url
  const token = cookies.get('token')

  return axios.delete(fullUrl, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
}
