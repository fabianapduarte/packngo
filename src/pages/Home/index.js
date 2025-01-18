import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect, useContext } from 'react'
import { LogIn, Plus } from 'react-feather'
import { format, isBefore, isAfter } from 'date-fns';

import { Button, Layout } from '../../components'
import { TravelCard } from '../../components/TravelCard'
import { enumButtonColor } from '../../enums/enumButtonColor'
import { enumTravelStatus } from '../../enums/enumTravelStatus'
import AddTrip from './AddTrip'
import JoinTrip from './JoinTrip'
import './styles.css'
import { useSnackbar } from 'notistack'
import { tripRoute } from '../../utils/routes'
import { UserContext } from '../../context/UserContext'
import { dateFormat } from '../../utils/dateFormat';

export default function Home() {
  const [users, setUsers] = useState([])
  const [trips, setTrips] = useState([])
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  const [showAddTrip, setShowAddTrip] = useState(false)
  const [showJoinTrip, setShowJoinTrip] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const userContext = useContext(UserContext)

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

  const handleAddTrip = (newTrip) => {
    const updatedTrips = [...trips, newTrip]
    setTrips(updatedTrips)
    const updatedUser = {
      ...user,
      activeTrips: [...user.activeTrips, newTrip.id],
    }
    enqueueSnackbar('Viagem criada com sucesso!', { variant: 'success' })
    navigate(tripRoute(newTrip.id))
    setUser(updatedUser)
  }

  const handleJoinTrip = (newTrip) => {
    const updatedUser = {
      ...user,
      activeTrips: [...user.activeTrips, newTrip.id],
    }
    setUser(updatedUser)
    enqueueSnackbar('Sucesso ao entrar no grupo da viagem', { variant: 'success' })
    navigate(tripRoute(newTrip.id))
  }

  const getUserTrips = async() => {
    const trips = await userContext.getTrips()
    if(trips){
      console.log(trips)
      
      const updatedTrips = trips.map((tripItem) => {
        let status = null;
        const now = new Date();
  
        if (isBefore(now, new Date(tripItem.start_date))) {
          status = enumTravelStatus.planned;
        } else if (isAfter(now, new Date(tripItem.end_date))) {
          status = enumTravelStatus.finished;
        } else {
          status = enumTravelStatus.progress;
        }
        
        return { ...tripItem, status };
      });

      console.log(updatedTrips)
      setTrips(updatedTrips);
    }else{
      return []
    }
  }

  const statusFormat = (status) => {
    if (status === 0) return enumTravelStatus.planned
    else if (status === 1) return enumTravelStatus.progress
    else if (status === 2) return enumTravelStatus.finished
  }

  useEffect(() => {
    getUserTrips()
  }, [])

  useEffect(() => {}, [trips])
  useEffect(() => {}, [user])

  return (
    <Layout>
      <div className="lg:items-center self-start w-full">
        <JoinTrip
          show={showJoinTrip}
          onClose={handleCloseJoinTrip}
          onJoinTrip={handleJoinTrip}
          trips={trips}
          users={users}
        />
        <AddTrip show={showAddTrip} onClose={handleCloseAddTrip} onAddTrip={handleAddTrip} trips={trips} />
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
        <div className="grid grid-cols-1 place-items-center md:grid-cols-2 xl:grid-cols-3 gap-6">
          {trips?.map((trip) => (
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
