export const baseUrl = 'http://localhost:8000/api'

export const storageUrl = 'http://localhost:8000/storage/'

export const loginUrl = '/login'

export const logoutUrl = '/logout'

export const registerUrl = '/register'

export const userUrl = (id) => `/users/${id}`

export const userProfileUrl = (id) => `/users/${id}/update-profile-img`

export const tripsUrl = '/trips'

export const tripUrl = (id) => `/trips/${id}`

export const fetchTripUrl = (id) => `/trips/${id}/fetch-trip`

export const joinTripUrl = (id) => `/trips/${id}/join`

export const leaveTripUrl = (id) => `/trips/${id}/leave`

export const editTripUrl = (id) => `/trips/${id}`
