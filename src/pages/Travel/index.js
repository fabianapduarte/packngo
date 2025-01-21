import { useState, useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowRight, Calendar, CheckSquare, Edit3, LogOut, MapPin, Plus, Trash2, UserPlus } from 'react-feather'
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
  TravelStatus,
} from '../../components'
import { enumButtonColor } from '../../enums/enumButtonColor'
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
import { dateFormat, formatDatetime } from '../../utils/dateFormat'
import { TripContext } from '../../context/TripContext'
import { ListsContext } from '../../context/ListsContext'
import { PollContext } from '../../context/PollContext'
import { EventContext } from '../../context/EventContext'
import { getTripImage } from '../../utils/getTripImage'

const InfoItem = ({ Icon, text }) => {
  return (
    <span className="flex gap-1 w-fit items-center">
      <Icon size={16} />
      <div>{text}</div>
    </span>
  )
}

const ChecklistItem = ({ text, isChecked, onDelete, onCheck }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-full">
        <Checkbox text={text} isChecked={isChecked} onChange={onCheck} />
      </div>
      <Trash2 size={16} color="#BCC1BA" className="cursor-pointer" onClick={onDelete} />
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
          <span>{formatDatetime(event.start_datetime)}</span>
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
        <h4 className="text-md font-bold text-ellipsis whitespace-nowrap overflow-hidden mb-3">{title}</h4>
        <TextButton label="Ver votação" Icon={CheckSquare} onClick={openPoll} />
      </div>
    </div>
  )
}

export const Travel = () => {
  const [trip, setTrip] = useState(null)
  const [events, setEvents] = useState(null)
  const [list, setList] = useState(null)
  const [polls, setPolls] = useState(null)
  const { id } = useParams()
  const tripContext = useContext(TripContext)
  const eventContext = useContext(EventContext)
  const listsContext = useContext(ListsContext)
  const pollContext = useContext(PollContext)

  useEffect(() => {
    fetchTripData()
  }, [])

  const fetchTripData = async () => {
    const trip = await tripContext.showTrip(id)
    if (trip) setTrip(trip)
    await updateItemsList()
    await updatePollsList()
    await updateEventsList()
  }

  const handleCancelPresence = async () => {
    await updateEventsList()
  }

  const refreshTrip = async () => {
    setTrip(null)
    const trip = await tripContext.showTrip(id)
    if (trip) {
      setTrip(trip)
    }
  }

  const updateItemsList = async () => {
    const listsSearched = await listsContext.getList(id)
    if (listsSearched) {
      setList(listsSearched)
    }
  }

  const updatePollsList = async () => {
    const pollsSearched = await pollContext.getPoll(id)
    if (pollsSearched) {
      setPolls(pollsSearched)
    }
  }

  const updateEventsList = async () => {
    const eventsSearched = await eventContext.getEvents(id)
    if (eventsSearched) {
      setEvents(eventsSearched)
    }
  }

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

  const handleDeleteItemOnChecklist = async (idItem) => {
    const { success } = await listsContext.deleteItem({ idItem, idTrip: id })
    if (success) {
      const newList = list.filter(({ id }) => id !== idItem)
      setList(newList)
    }
  }

  const handleCheckItem = async (idItem) => {
    const { success, itemUpdated } = await listsContext.checkItem({ idItem, idTrip: id })
    if (success) {
      const newList = list.map((item) => {
        if (item.id === idItem) return itemUpdated
        else return item
      })
      setList(newList)
    }
  }

  const handleChangeOnAddItem = async (value) => {
    if (value.length > 0) {
      const { success, newItem } = await listsContext.addItem({ item: value, idTrip: id })
      if (success) {
        const newList = [...list, newItem]
        setList(newList)
        setNewItemOnChecklist(false)
      }
    }
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

  if (!trip || !events || !list || !polls) return <Loading />

  return (
    <Layout>
      <div className="grid-travel">
        <Card>
          <img
            src={getTripImage(trip.image_path)}
            alt="Imagem da viagem"
            className="rounded object-cover img-card self-center"
          />
          <h2 className="mt-2 mb-5 text-2xl font-bold w-full line-clamp-2">{trip.title}</h2>
          <div className="flex flex-col gap-2 mb-5">
            <div className="mb-1 font-bold">Informações</div>
            <TravelStatus status={trip.status} />
            <InfoItem Icon={MapPin} text={trip.destination} />
            <InfoItem Icon={Calendar} text={dateFormat(trip.start_date, trip.end_date)} />
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
            {trip.participants.map((participant, index) => (
              <Participant key={`participant-${index}`} imageSrc={participant.image_path} name={participant.name} />
            ))}
            <ButtonOutlined
              color={enumButtonColor.primary}
              label="Adicionar participante"
              Icon={UserPlus}
              onClick={() => setOpenModalAddParticipant(true)}
            />
            <ButtonOutlined
              color={enumButtonColor.primary}
              label="Sair da viagem em grupo"
              Icon={LogOut}
              onClick={() => setOpenModalLeaveTrip(true)}
            />
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
              elements={events.map((event) => (
                <EventCard key={event.id} event={event} onClick={() => handleSeeEvent(event)} />
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
              elements={polls.map((poll) => (
                <PollCard key={poll.id} title={poll.title} openPoll={() => handleSeePoll(poll)} />
              ))}
            />
          </Card>
          <Card>
            <div className="flex flex-col">
              <h3 className="font-bold text-xl">Listas</h3>
              <div className="mt-6 mb-3 flex flex-col gap-2">
                {list.map(({ item, is_checked, id }) => (
                  <ChecklistItem
                    key={id}
                    text={item}
                    isChecked={is_checked}
                    onDelete={() => handleDeleteItemOnChecklist(id)}
                    onCheck={() => handleCheckItem(id)}
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

      {openModalAddParticipant && (
        <ModalAddParticipant code={trip.code} onClose={() => setOpenModalAddParticipant(false)} />
      )}

      {openModalLeaveTrip && <ModalLeaveTrip tripTitle={trip.title} onClose={() => setOpenModalLeaveTrip(false)} />}

      {openModalDeleteTrip && <ModalDeleteTrip onClose={() => setModalOpenDeleteTrip(false)} />}

      {openModalCreatePoll && (
        <ModalCreatePoll onClose={() => setOpenModalCreatePoll(false)} onSuccess={updatePollsList} idTrip={id} />
      )}

      {openModalCreateEvent && (
        <ModalCreateEvent onClose={() => setOpenModalCreateEvent(false)} onSuccess={updateEventsList} />
      )}

      {openModalEditEvent && (
        <ModalEditEvent onClose={handleCloseModalEditEvent} event={eventSelected} onSuccess={updateEventsList} />
      )}

      {openModalEditTrip && (
        <ModalEditTrip onClose={() => setOpenModalEditTrip(false)} trip={trip} refreshTrip={refreshTrip} />
      )}

      {openModalSeeEvent && (
        <ModalSeeEvent
          event={eventSelected}
          onClose={handleCloseModalSeeEvent}
          openDeleteModal={() => setOpenModalDeleteEvent(true)}
          openEditModal={() => setOpenModalEditEvent(true)}
          onChangePresence={handleCancelPresence}
        />
      )}

      {openModalDeleteEvent && (
        <ModalDeleteEvent
          onClose={() => setOpenModalDeleteEvent(false)}
          event={eventSelected}
          onSuccess={updateEventsList}
        />
      )}

      {openModalSeePoll && (
        <ModalSeePoll onClose={handleCloseModalSeePoll} poll={pollSelected} onSuccess={updatePollsList} />
      )}
    </Layout>
  )
}
