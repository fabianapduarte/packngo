import React, { useState, useEffect, useContext } from 'react'
import { LogIn, Plus } from 'react-feather'

import { Button, Layout, Loading } from '../../components'
import { TravelCard } from '../../components/TravelCard'
import { TripContext } from '../../context/TripContext'
import { enumButtonColor } from '../../enums/enumButtonColor'
import { dateFormat } from '../../utils/dateFormat'
import AddTrip from './AddTrip'
import JoinTrip from './JoinTrip'
import './styles.css'
import { getTripStatus } from '../../utils/getTripStatus'

export default function Home() {
  const [trips, setTrips] = useState([])
  const [showAddTrip, setShowAddTrip] = useState(false)
  const [showJoinTrip, setShowJoinTrip] = useState(false)
  const tripContext = useContext(TripContext)

  const handleOpenAddTrip = () => {
    setShowAddTrip(true)
  }
  const handleCloseAddTrip = () => {
    setShowAddTrip(false)
  }

  const handleOpenJoinTrip = () => {
    setShowJoinTrip(true)
  }
  const handleCloseJoinTrip = () => {
    setShowJoinTrip(false)
  }

  const getUserTrips = async () => {
    const trips = await tripContext.getTrips()
    if (trips) {
      setTrips(trips)
    } else {
      return []
    }
  }

  useEffect(() => {
    getUserTrips()
  }, [])

  if (tripContext.loading) return <Loading />

  return (
    <Layout>
      <div className="lg:items-center self-start w-full">
        <JoinTrip show={showJoinTrip} onClose={handleCloseJoinTrip} />
        <AddTrip show={showAddTrip} onClose={handleCloseAddTrip} />
        <div className="flex items-center justify-between mb-7">
          <h3 className="font-bold text-2xl">Minhas viagens</h3>
          <div className="flex space-x-4">
            <Button
              label="Entrar em viagem"
              onClick={handleOpenJoinTrip}
              color={enumButtonColor.primary}
              type="submit"
              Icon={LogIn}
            />
            <Button
              label="Criar viagem"
              onClick={handleOpenAddTrip}
              color={enumButtonColor.primary}
              type="submit"
              Icon={Plus}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 place-items-center md:grid-cols-2 2xl:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <TravelCard
              key={trip.id}
              id={trip.id}
              name={trip.title}
              status={trip.status}
              date={dateFormat(trip.start_date, trip.end_date)}
              location={trip.destination}
              image={trip.image_path}
            />
          ))}
        </div>
      </div>
    </Layout>
  )
}
