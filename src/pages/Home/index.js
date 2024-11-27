import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { LogIn, Plus } from 'react-feather'
import { Button, Layout } from '../../components'
import { TravelCard } from '../../components/TravelCard'
import { enumButtonColor } from '../../enums/enumButtonColor'
import { enumTravelStatus } from '../../enums/enumTravelStatus'
import AddTrip from './AddTrip'
import JoinTrip from './JoinTrip'
import DATAF from '../../assets/data.json'
import './styles.css'

export default function Home() {
  const [users, setUsers] = useState([])
  const [trips, setTrips] = useState([])
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  const [showAddTrip, setShowAddTrip] = useState(false)
  const [showJoinTrip, setShowJoinTrip] = useState(false)

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
    setUser(updatedUser)
  }

  const handleJoinTrip = (newTrip) => {
    const updatedUser = {
      ...user,
      activeTrips: [...user.activeTrips, newTrip.id],
    }
    setUser(updatedUser)
  }

  const getUserTrips = () => {
    if (!user) return []
    return trips.filter((trip) => user.activeTrips.includes(trip.id))
  }

  const dateFormat = (dateStart, dateEnd) => {
    return new Date(dateStart).toLocaleDateString() + ' - ' + new Date(dateEnd).toLocaleDateString()
  }

  const statusFormat = (status) => {
    if (status === 0) return enumTravelStatus.planned
    else if (status === 1) return enumTravelStatus.progress
    else if (status === 2) return enumTravelStatus.finished
  }

  useEffect(() => {
    if (DATAF && DATAF[0] && DATAF[0].trips && DATAF[0].users) {
      setTrips(DATAF[0].trips)
      setUsers(DATAF[0].users)
    }
  }, [])

  useEffect(() => {}, [trips])
  useEffect(() => {}, [user])

  return (
    <Layout>
      <div className="lg:items-center">
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
        <div className="grid grid-cols-1 place-items-center md:grid-cols-2 gap-6">
          {getUserTrips().map((trip) => (
            <TravelCard
              key={trip.id}
              id={trip.id}
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
  )
}
