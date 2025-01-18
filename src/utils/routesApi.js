export const baseUrl = 'http://localhost:8000/api'

export const storageUrl = 'http://localhost:8000/storage/'

export const loginUrl = '/login'

export const logoutUrl = '/logout'

export const registerUrl = '/register'

export const addTripUrl = '/addTrip'

export const getTripsUrl = '/getTrips'

export const getParticipantsUrl = '/getParticipants'

export const joinTripUrl = '/joinTrip'

export const showTripUrl = '/showTrip'

export const deleteTripUrl = '/deleteTrip'

export const userUrl = (id) => `/users/${id}`

export const userProfileUrl = (id) => `/users/${id}/update-profile-img`
