import { storageUrl } from './routesApi'
import defaultImage from '../assets/profile.png'

export const getUserImage = (imagePath) => {
  if (imagePath) return storageUrl + imagePath
  else return defaultImage
}
