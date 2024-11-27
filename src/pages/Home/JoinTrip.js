import React, { useState } from 'react'
import { LogIn, Calendar, MapPin, Check } from 'react-feather'
import { TravelStatus } from '../../components/TravelStatus'
import { Button, Input, Modal } from '../../components'
import { enumButtonColor } from '../../enums/enumButtonColor'
import { enumTravelStatus } from '../../enums/enumTravelStatus'
import './styles.css'
import { useSnackbar } from 'notistack'

export default function JoinTrip({ show, onClose, onJoinTrip, trips, users }) {
  const [tripUsers, setTripUsers] = useState(0)
  const [step, setStep] = useState(1)
  const [inviteCode, setInviteCode] = useState('')
  const [trip, setTrip] = useState(null)
  const { enqueueSnackbar } = useSnackbar()

  if (!show) {
    return null
  }

  const handleNext = () => {
    const found = trips.find((t) => t.inviteCode === inviteCode)
    if (found) {
      setTrip(found)
      setStep(step + 1)
      setTripUsers(getTripUsers(found))
    } else {
      enqueueSnackbar('Viagem não encontrada. Por favor, verifique o código e tente novamente.', { variant: 'error' })
    }
  }

  const handlePrev = () => {
    setStep(step - 1)
    setInviteCode('')
    setTrip(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (trip) {
      onJoinTrip(trip)
      onClose()
      handlePrev()
    }
  }

  const dateFormat = (dateStart, dateEnd) => {
    return new Date(dateStart).toLocaleDateString() + ' - ' + new Date(dateEnd).toLocaleDateString()
  }

  const statusFormat = (status) => {
    switch (status) {
      case 0:
        return enumTravelStatus.planned
      case 1:
        return enumTravelStatus.progress
      case 2:
        return enumTravelStatus.finished
      default:
        return 'Desconhecido'
    }
  }

  const getTripUsers = (trip) => {
    if (!trip || !users) return []
    return users.filter((user) => user.activeTrips.includes(trip.id))
  }

  return (
    <Modal size="md" title={step === 1 ? 'Entrar em uma viagem' : `Deseja entrar em ${trip.title}?`} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <>
            <div className="mb-4">
              <Input
                value={inviteCode}
                id="inviteCode"
                onChange={(e) => setInviteCode(e.target.value)}
                label="Código"
                type="text"
                required
              />
            </div>
            <div className="flex justify-end space-x-4">
              <Button label="Cancelar" color={enumButtonColor.transparentPrimary} type="button" onClick={onClose} />
              <Button Icon={LogIn} label="Entrar" onClick={handleNext} color={enumButtonColor.primary} type="button" />
            </div>
          </>
        )}
        {step === 2 && trip && (
          <>
            <div className="mb-4">
              <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl overflow-hidden bg-white my-4 rounded min-h-36 h-full">
                <div className="grid grid-cols-1 lg:grid-cols-3 min-h-full">
                  <div className="relative overflow-hidden object-cover min-w-[175px] min-h-[175px] rounded col-span-1">
                    <img src={trip.image} alt={trip.imageAlt} className="w-full h-full object-cover" />
                  </div>
                  <div className="px-6 py-4 col-span-2 my-auto ml-5">
                    <div className="pl-0.5">
                      <TravelStatus status={statusFormat(trip.status)} />
                    </div>
                    <p className="text-gray-700 text-base flex items-center pr-3 w-fit">
                      <span className="mr-2">
                        <MapPin size={16} />
                      </span>
                      {trip.destination}
                    </p>
                    <p className="text-gray-700 text-base flex items-center pr-3 w-fit">
                      <span className="mr-2">
                        <Calendar size={16} />
                      </span>
                      {dateFormat(trip.dateStart, trip.dateEnd)}
                    </p>
                    <div className="flex mt-2">
                      {tripUsers.slice(0, 3).map((participant) => (
                        <img
                          key={participant.id}
                          src={participant.image}
                          alt={participant.name}
                          className="w-10 h-10 rounded-full border-2 border-white -ml-2 first:ml-0"
                        />
                      ))}
                      {tripUsers && tripUsers.length > 3 && (
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 -ml-2">
                          +{tripUsers.length - 3} participantes
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <Button label="Cancelar" color={enumButtonColor.transparentPrimary} type="button" onClick={handlePrev} />
              <Button Icon={Check} label="Confirmar" color={enumButtonColor.primary} type="submit" />
            </div>
          </>
        )}
      </form>
    </Modal>
  )
}
