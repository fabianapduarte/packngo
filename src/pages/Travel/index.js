import { useState, useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowRight,
  Calendar,
  CheckSquare,
  DollarSign,
  Edit3,
  LogOut,
  MapPin,
  Plus,
  Trash2,
  UserPlus,
} from 'react-feather'
import img from '../../assets/london.jpg'
import imgParticipantOne from '../../assets/avatar1.png'
import data from '../../assets/data.json'
import {
  ButtonOutlined,
  Card,
  Checkbox,
  Layout,
  Loading,
  Participant,
  SimpleInput,
  Slider,
  TextButton,
  Tooltip,
  TravelStatus,
} from '../../components'
import { enumTravelStatus } from '../../enums/enumTravelStatus'
import { enumButtonColor } from '../../enums/enumButtonColor'
import { isBefore, isAfter } from 'date-fns'

import { ModalAddParticipant } from './components/ModalAddParticipant'
import { ModalLeaveTrip } from './components/ModalLeaveTrip'
import { ModalDeleteTrip } from './components/ModalDeleteTrip'
import { ModalCreatePoll } from './components/ModalCreatePoll'
import './styles.css'
import { ModalSeeEvent } from './components/ModalSeeEvent'
import { ModalDeleteEvent } from './components/ModalDeleteEvent'
import { ModalSeePoll } from './components/ModalSeePoll'
import { ModalCreateEvent } from './components/ModalCreateEvent'
import { ModalEditEvent } from './components/ModalEditEvent'
import { ModalEditTrip } from './components/ModalEditTrip'
import { calendarRoute } from '../../utils/routes'
import { dateFormat } from '../../utils/dateFormat'
import { TripContext } from '../../context/TripContext'
import { getTripImage } from '../../utils/getTripImage'

const InfoItem = ({ Icon, text }) => {
  return (
    <span className="flex gap-1 w-fit items-center">
      <Icon size={16} />
      <div>{text}</div>
    </span>
  )
}

const ChecklistItem = ({ text, isChecked, onClick }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-full">
        <Checkbox text={text} isChecked={isChecked} />
      </div>
      <Trash2 size={16} color="#BCC1BA" className="cursor-pointer" onClick={onClick} />
    </div>
  )
}

const EventCard = ({ event, onClick }) => {
  return (
    <div className="card">
      <div className="p-4 rounded bg-cardGray card-slider block max-w-full">
        <h4 className="text-md font-bold text-ellipsis whitespace-nowrap overflow-hidden">{event.title}</h4>
        <div className="flex gap-2 items-center mb-3">
          <Calendar size={16} />
          <span>
            {event.dateStart} - {event.timeStart}
          </span>
        </div>
        <TextButton label="Ver evento" Icon={ArrowRight} onClick={onClick} />
      </div>
    </div>
  )
}

const PollCard = ({ title, isOpen, openPoll }) => {
  return (
    <div className="card">
      <div className="p-4 rounded bg-cardGray card-slider block max-w-full">
        <h4 className="text-md font-bold text-ellipsis whitespace-nowrap overflow-hidden">{title}</h4>
        {isOpen && <div className="text-primary mb-3">Votação aberta</div>}
        {!isOpen && <div className="text-red mb-3">Votação fechada</div>}
        <TextButton label="Ver votação" Icon={CheckSquare} onClick={openPoll} />
      </div>
    </div>
  )
}

export const Travel = () => {
  const isParticipant = false
  const travel = data[0].trips[0]
  const { events, polls, inviteCode, title } = travel
  const { id } = useParams()
  const tripContext = useContext(TripContext)
  const [trip, setTrip] = useState(null)
  const [tripStatus, setTripStatus] = useState(null)
  const [participants, setParticipants] = useState([])

  useEffect(() => {
    const fetchTripData = async () => {
      const trip = await tripContext.showTrip(id)
      await fetchTripParticipants()
      if (trip) {
        setTrip(trip)

        //Decisao de status
        let status = null
        const now = new Date()
        if (isBefore(now, new Date(trip.start_date))) {
          status = enumTravelStatus.planned
        } else if (isAfter(now, new Date(trip.end_date))) {
          status = enumTravelStatus.finished
        } else {
          status = enumTravelStatus.progress
        }
        setTripStatus(status)
      }
    }

    const fetchTripParticipants = async () => {
      const data = await tripContext.getParticipants(id)
      if (data) {
        setParticipants(data)
      }
    }

    fetchTripData()
  }, [])

  const [checklist, setChecklist] = useState(travel.checklist)
  const [newItemOnChecklist, setNewItemOnChecklist] = useState(false)
  const [openModalAddParticipant, setOpenModalAddParticipant] = useState(false)
  const [openModalLeaveTrip, setOpenModalLeaveTrip] = useState(false)
  const [openModalDeleteTrip, setModalOpenDeleteTrip] = useState(false)
  const [openModalCreatePoll, setOpenModalCreatePoll] = useState(false)
  const [openModalCreateEvent, setOpenModalCreateEvent] = useState(false)
  const [openModalEditEvent, setOpenModalEditEvent] = useState(false)
  const [openModalEditTrip, setOpenModalEditTrip] = useState(false)
  const [openModalSeeEvent, setOpenModalSeeEvent] = useState(false)
  const [openModalSeePoll, setOpenModalSeePoll] = useState(false)
  const [openModalDeleteEvent, setOpenModalDeleteEvent] = useState(false)
  const [eventSelected, setEventSelected] = useState(null)
  const [pollSelected, setPollSelected] = useState(null)

  const handleDeleteItemOnChecklist = (indexToDelete) => {
    const newChecklist = checklist.filter((_, index) => index !== indexToDelete)
    setChecklist(newChecklist)
  }

  const handleChangeOnAddItem = (value) => {
    const newChecklist = [...checklist, { title: value, isChecked: false }]
    setChecklist(newChecklist)
    setNewItemOnChecklist(false)
  }

  const handleSeeEvent = (event) => {
    setOpenModalSeeEvent(true)
    setEventSelected(event)
  }

  const handleCloseModalSeeEvent = () => {
    setOpenModalSeeEvent(false)
  }

  const handleSeePoll = (poll) => {
    setOpenModalSeePoll(true)
    setPollSelected(poll)
  }

  const handleCloseModalSeePoll = () => {
    setOpenModalSeePoll(false)
    setPollSelected(null)
  }

  const handleCloseModalEditEvent = () => {
    setOpenModalEditEvent(false)
    setEventSelected(null)
  }

  if (!trip || participants.length === 0) return <Loading />

  return (
    <Layout>
      <div className="grid-travel">
        <Card>
          <img src={img} alt="Imagem da viagem" className="rounded object-cover img-card self-center" />
          <h2 className="mt-2 mb-5 text-2xl font-bold w-full line-clamp-2">{trip.title}</h2>
          <div className="flex flex-col gap-2 mb-5">
            <div className="mb-1 font-bold">Informações</div>
            <TravelStatus status={tripStatus ? tripStatus : '-'} />
            <InfoItem Icon={MapPin} text={trip.destination} />
            <InfoItem Icon={Calendar} text={dateFormat(trip.start_date, trip.end_date)} />
            <Tooltip
              element={<InfoItem Icon={DollarSign} text="R$ 7500,00" />}
              text="Seu gasto individual previsto para a viagem"
            />
            <div className="flex gap-2">
              <ButtonOutlined
                color={enumButtonColor.primary}
                label="Editar"
                Icon={Edit3}
                onClick={() => setOpenModalEditTrip(true)}
              />
              <ButtonOutlined
                color={enumButtonColor.red}
                label="Excluir"
                Icon={Trash2}
                onClick={() => setModalOpenDeleteTrip(true)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="mb-1 font-bold">Participantes</div>
            {participants.map((participant) => (
              <Participant imageSrc={participant.image_path} name={participant.name} />
            ))}
            {isParticipant && (
              <ButtonOutlined
                color={enumButtonColor.primary}
                label="Sair da viagem em grupo"
                Icon={LogOut}
                onClick={() => setOpenModalLeaveTrip(true)}
              />
            )}
            {!isParticipant && (
              <ButtonOutlined
                color={enumButtonColor.primary}
                label="Adicionar participante"
                Icon={UserPlus}
                onClick={() => setOpenModalAddParticipant(true)}
              />
            )}
          </div>
        </Card>

        <div className="flex flex-col gap-6 overflow-hidden">
          <Card>
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
              <h3 className="font-bold text-xl">Eventos</h3>
              <div className="flex flex-wrap gap-4">
                <Link to={calendarRoute(id)}>
                  <ButtonOutlined color={enumButtonColor.primary} label="Ver agenda" Icon={Calendar} />
                </Link>
                <ButtonOutlined
                  color={enumButtonColor.primary}
                  label="Criar evento"
                  Icon={Plus}
                  onClick={() => setOpenModalCreateEvent(true)}
                />
              </div>
            </div>
            <Slider
              noElementsMessage="Não há eventos cadastrados."
              elements={events.map((event, index) => (
                <EventCard key={`event-${index}`} event={event} onClick={() => handleSeeEvent(event)} />
              ))}
            />
          </Card>
          <Card>
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
              <h3 className="font-bold text-xl">Enquetes</h3>
              <ButtonOutlined
                color={enumButtonColor.primary}
                label="Criar enquete"
                Icon={CheckSquare}
                onClick={() => setOpenModalCreatePoll(true)}
              />
            </div>
            <Slider
              noElementsMessage="Não há enquetes cadastradas."
              elements={
                polls.length > 0 &&
                polls.map((poll, index) => (
                  <PollCard
                    key={`poll-${index}`}
                    title={poll.title}
                    isOpen={poll.open}
                    openPoll={() => handleSeePoll(poll)}
                  />
                ))
              }
            />
          </Card>
          <Card>
            <div className="flex flex-col">
              <h3 className="font-bold text-xl">Listas</h3>
              <div className="mt-6 mb-3 flex flex-col gap-2">
                {checklist.map((item, index) => (
                  <ChecklistItem
                    key={item.title}
                    text={item.title}
                    isChecked={item.isChecked}
                    onClick={() => handleDeleteItemOnChecklist(index)}
                  />
                ))}
              </div>
              {newItemOnChecklist && (
                <SimpleInput
                  id="new-item"
                  required={false}
                  placeholder="Novo item"
                  onEnter={(value) => handleChangeOnAddItem(value)}
                />
              )}
              <TextButton label="Adicionar item" Icon={Plus} onClick={() => setNewItemOnChecklist(true)} />
            </div>
          </Card>
        </div>
      </div>

      {openModalAddParticipant && <ModalAddParticipant code={id} onClose={() => setOpenModalAddParticipant(false)} />}

      {openModalLeaveTrip && <ModalLeaveTrip tripTitle={title} onClose={() => setOpenModalLeaveTrip(false)} />}

      {openModalDeleteTrip && <ModalDeleteTrip onClose={() => setModalOpenDeleteTrip(false)} />}

      {openModalCreatePoll && <ModalCreatePoll onClose={() => setOpenModalCreatePoll(false)} />}

      {openModalCreateEvent && <ModalCreateEvent onClose={() => setOpenModalCreateEvent(false)} />}

      {openModalEditEvent && <ModalEditEvent onClose={handleCloseModalEditEvent} event={eventSelected} />}

      {openModalEditTrip && <ModalEditTrip onClose={() => setOpenModalEditTrip(false)} travel={travel} />}

      {openModalSeeEvent && (
        <ModalSeeEvent
          event={eventSelected}
          onClose={handleCloseModalSeeEvent}
          openDeleteModal={() => setOpenModalDeleteEvent(true)}
          openEditModal={() => setOpenModalEditEvent(true)}
        />
      )}

      {openModalDeleteEvent && <ModalDeleteEvent onClose={() => setOpenModalDeleteEvent(false)} />}

      {openModalSeePoll && <ModalSeePoll onClose={handleCloseModalSeePoll} poll={pollSelected} />}
    </Layout>
  )
}
