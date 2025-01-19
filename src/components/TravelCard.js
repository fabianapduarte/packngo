import { Calendar, MapPin } from 'react-feather'
import { TravelStatus } from './TravelStatus'
import { Link } from 'react-router-dom'
import '../pages/Home/styles.css'
import { tripRoute } from '../utils/routes'
import { getTripImage } from '../utils/getTripImage'

export const TravelCard = ({ id, name, status, date, location, image, imageAlt = 'Placeholder' }) => {
  return (
    <div className="bg-white rounded h-64 lg:h-36 w-full">
      <Link to={tripRoute(id)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 h-full">
          <div className="relative overflow-hidden min-w-[100px] rounded-t lg:rounded-l lg:rounded-tr-none col-span-1">
            <img src={getTripImage(image)} alt={imageAlt} className="w-full h-full object-cover z-0" />
          </div>
          <div className="p-4 col-span-2 my-auto">
            <div className="font-bold text-xl mb-2 line-clamp-1">{name}</div>
            <div className="pl-0.5">
              <TravelStatus status={status} />
            </div>
            <p className="text-gray-700 text-base flex items-center pr-3 w-fit">
              <span className="mr-2">
                <MapPin size={16} />
              </span>
              {location}
            </p>
            <p className="text-gray-700 text-base flex items-center pr-3 w-fit">
              <span className="mr-2">
                <Calendar size={16} />
              </span>
              {date}
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}
