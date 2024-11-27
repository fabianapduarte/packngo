import { Calendar, MapPin } from 'react-feather';
import { TravelStatus } from './TravelStatus';
import "../pages/Home/styles.css";

export const TravelCard = ({ name, status, date, location, image = "https://placehold.co/400x400@2x.png", imageAlt = "Placeholder" }) => {
  return (
    <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl overflow-hidden bg-white my-4 rounded min-h-36 h-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 min-h-full">
        <div className="relative overflow-hidden object-cover min-w-[100px] md:rounded-l md:rounded-t-none lg:rounded-l lg:rounded-t-none col-span-1">
          <img src={image} alt={imageAlt} className="w-full h-full object-cover" />
        </div>
        <div className="md:rounded-r md:rounded-b-none rounded-b px-6 py-4 col-span-2 my-auto">
          <div className="font-bold text-xl mb-2">{name}</div>
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
    </div>
  );
}
