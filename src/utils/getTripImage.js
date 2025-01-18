import { storageUrl } from './routesApi'
import defaultImage from '../assets/map.jpg'

export const getTripImage = (imagePath) => {
  if (imagePath) return storageUrl + imagePath
  else return defaultImage
}
