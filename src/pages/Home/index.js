import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { List, LogIn, Plus } from 'react-feather';
import { Button, Layout } from '../../components';
import { TravelCard } from '../../components/TravelCard';
import { enumButtonColor } from '../../enums/enumButtonColor';
import { enumTravelStatus } from '../../enums/enumTravelStatus';
import AddTrip from './AddTrip';
import DATAF from '../../assets/data.json';
import './styles.css';

export default function Home() {
  const location = useLocation();
  const [trips, setTrips] = useState([]);
  const { user } = location.state || {};
  const [showAddTrip, setShowAddTrip] = useState(false);

  const handleOpenAddTrip = () => {
    setShowAddTrip(true);
  };
  const handleCloseAddTrip = () => {
    setShowAddTrip(false);
  };

  const getUserTrips = () => {
    if (!user) return [];
    return trips.filter(trip => user.activeTrips.includes(trip.id));
  };

  const dateFormat = (dateStart, dateEnd) => {
    return new Date(dateStart).toLocaleDateString() + " - " + new Date(dateEnd).toLocaleDateString();
  };

  const statusFormat = (status) => {
    if (status === 0) return enumTravelStatus.planned;
    else if (status === 1) return enumTravelStatus.progress;
    else if (status === 2) return enumTravelStatus.finished;
  };

  useEffect(() => {
    setTrips(DATAF[0].trips);
  }, []);

  return (
    <Layout>
      <div className="lg:items-center">
        <AddTrip show={showAddTrip} onClose={handleCloseAddTrip} />
        <div className="flex items-center justify-between mb-7">
          <div className="font-bold text-2xl">Minhas viagens</div>
          <div className="flex space-x-4">
            <Button label="Entrar em viagem" color={enumButtonColor.primary} type="submit" Icon={LogIn} />
            <Button label="Criar viagem" onClick={handleOpenAddTrip} color={enumButtonColor.primary} type="submit" Icon={Plus} />
          </div>
        </div>
        <div className="grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {getUserTrips().map((trip) => (
            <TravelCard
              key={trip.id}
              name={trip.title}
              status={statusFormat(trip.status)}
              date={dateFormat(trip.dateStart, trip.dateEnd)}
              location={trip.destination}
              image={trip.image}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
