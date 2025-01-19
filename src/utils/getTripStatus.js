import { isAfter, isBefore } from 'date-fns'
import { enumTravelStatus } from '../enums/enumTravelStatus'

export const getTripStatus = (startDate, endDate) => {
  let status = null
  const now = new Date()

  if (isBefore(now, new Date(startDate))) {
    status = enumTravelStatus.planned
  } else if (isAfter(now, new Date(endDate))) {
    status = enumTravelStatus.finished
  } else {
    status = enumTravelStatus.progress
  }

  return status
}
