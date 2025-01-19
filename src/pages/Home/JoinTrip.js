import React, { useState, useContext } from 'react'
import { LogIn, Calendar, MapPin, Check } from 'react-feather'
import { useSnackbar } from 'notistack'

import { TravelStatus } from '../../components/TravelStatus'
import { Button, ButtonLoading, Input, Modal } from '../../components'
import { TripContext } from '../../context/TripContext'
import { enumButtonColor } from '../../enums/enumButtonColor'
import './styles.css'
import { getTripImage } from '../../utils/getTripImage'
import { getUserImage } from '../../utils/getUserImage'

export default function JoinTrip({ show, onClose }) {
  const [step, setStep] = useState(1)
  const [inviteCode, setInviteCode] = useState('')
  const [trip, setTrip] = useState(null)
  const { enqueueSnackbar } = useSnackbar()
  const tripContext = useContext(TripContext)

  const handleNext = async () => {
    if (inviteCode === '') enqueueSnackbar('Campo obrigatório.', { variant: 'warning' })
    else {
      const foundTrip = await tripContext.previewTrip(inviteCode)
      if (foundTrip) {
        setTrip(foundTrip)
        setStep(2)
      }
    }
  }

  const handlePrev = () => {
    setStep(1)
    setInviteCode('')
    setTrip(null)
  }

  const handleClose = () => {
    onClose()
    setStep(1)
    setTrip(null)
    setInviteCode('')
  }

  const handleJoin = async () => {
    await tripContext.joinTrip(trip.id)
  }

  const dateFormat = (dateStart, dateEnd) => {
    return new Date(dateStart).toLocaleDateString() + ' - ' + new Date(dateEnd).toLocaleDateString()
  }

  if (!show) {
    return null
  }

  return (
    <Modal
      size="md"
      title={step === 1 ? 'Entrar em uma viagem' : `Deseja entrar em ${trip.title}?`}
      onClose={handleClose}
    >
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
            <Button
              label="Cancelar"
              color={enumButtonColor.transparentPrimary}
              type="button"
              onClick={handleClose}
              disabled={tripContext.loading}
            />
            {tripContext.loading && <ButtonLoading color={enumButtonColor.primary} />}
            {!tripContext.loading && (
              <Button Icon={LogIn} label="Entrar" onClick={handleNext} color={enumButtonColor.primary} type="button" />
            )}
          </div>
        </>
      )}
      {step === 2 && trip && (
        <>
          <div className="mb-4">
            <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl overflow-hidden bg-white my-4 rounded min-h-36 h-full">
              <div className="grid grid-cols-1 lg:grid-cols-3 min-h-full">
                <div className="relative overflow-hidden object-cover min-w-[175px] min-h-[175px] rounded col-span-1">
                  <img
                    src={getTripImage(trip.image_path)}
                    alt="Imagem da viagem"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="lg:px-6 py-4 col-span-2 my-auto lg:ml-5">
                  <div className="pl-0.5">
                    <TravelStatus status={trip.status} />
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
                    {dateFormat(trip.start_date, trip.end_date)}
                  </p>
                  <div className="flex mt-2">
                    {trip.participants.slice(0, 3).map((participant) => (
                      <img
                        key={participant.id}
                        src={getUserImage(participant.image_path)}
                        alt={participant.name}
                        className="w-10 h-10 rounded-full border-2 border-white -ml-2 first:ml-0"
                      />
                    ))}
                    {trip.participants.length > 3 && (
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 -ml-2">
                        +{trip.participants.length - 3} participantes
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <Button
              label="Voltar"
              color={enumButtonColor.transparentPrimary}
              type="button"
              onClick={handlePrev}
              disabled={tripContext.loading}
            />
            {tripContext.loading && <ButtonLoading color={enumButtonColor.primary} />}
            {!tripContext.loading && (
              <Button
                Icon={Check}
                label="Confirmar"
                onClick={handleJoin}
                color={enumButtonColor.primary}
                type="button"
              />
            )}
          </div>
        </>
      )}
    </Modal>
  )
}
