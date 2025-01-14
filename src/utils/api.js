import axios from 'axios'
import { baseUrl } from './routesApi'
import { cookies } from './cookies'

const getHeaders = () => {
  const token = cookies.get('token')

  return {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }
}

const getFullUrl = (url) => {
  return baseUrl + url
}

export const post = (url, data) => {
  const fullUrl = getFullUrl(url)
  const headers = getHeaders()

  return axios.post(fullUrl, data, headers)
}

export const get = (url) => {
  const fullUrl = getFullUrl(url)
  const headers = getHeaders()

  return axios.get(fullUrl, headers)
}

export const patch = (url, data) => {
  const fullUrl = getFullUrl(url)
  const headers = getHeaders()

  return axios.patch(fullUrl, data, headers)
}

export const del = (url) => {
  const fullUrl = getFullUrl(url)
  const headers = getHeaders()

  return axios.delete(fullUrl, headers)
}
