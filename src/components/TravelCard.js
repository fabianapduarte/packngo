import { Calendar, MapPin } from 'react-feather';
import { TravelStatus } from './TravelStatus';


export const TravelCard = ({ name, status, date, location, image = "https://placehold.co/600x400@2x.png", imageAlt = "Placeholder" }) => {
  return (
    <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl rounded overflow-hidden shadow-lg bg-white">
      <div className="lg:grid lg:grid-cols-3">
        <img src={image} alt={imageAlt} className="rounded-l" />
        <div className="rounded-r px-6 py-4 col-span-2 my-auto">
          <div className="font-bold text-xl mb-2">{name}</div>
          <TravelStatus status={status} />
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

    </div>
  )
}
