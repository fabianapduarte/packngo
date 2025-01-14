import axios from 'axios'
import { baseUrl } from './routesApi'
import { cookies } from './cookies'

const token = cookies.get('token')

export const api = axios.create({
  baseURL: baseUrl,
  headers: {
    Accept: 'application/json',
    Authorization: token ? token : undefined,
  },
})
