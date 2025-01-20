import { useState, useContext, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'react-feather'
import { useParams } from 'react-router-dom'

import imgParticipantOne from '../../assets/avatar1.png'
import imgParticipantTwo from '../../assets/avatar2.png'
import imgParticipantThree from '../../assets/avatar3.png'
import { ButtonIcon, Card, Layout, Participant, TravelStatus, Loading } from '../../components'
import { enumTravelStatus } from '../../enums/enumTravelStatus'
import { enumButtonColor } from '../../enums/enumButtonColor'

import Calendar from 'react-calendar'
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar'
import 'react-calendar/dist/Calendar.css'
import moment from 'moment'
import 'moment/locale/pt-br'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import './styles.css'

import { TripContext } from '../../context/TripContext'
import { EventContext } from '../../context/EventContext'

const localizer = momentLocalizer(moment)

const CustomDayHeader = ({ date, label }) => {
  const formattedDate = moment(date).format('DD')
  const dayName = moment(date).format('ddd')

  return (
    <div className="flex flex-col items-center">
      <span className="dayName">{dayName}</span>
      <span className="formattedDate">{formattedDate}</span>
    </div>
  )
}

export const Schedule = () => {
  const {id} = useParams()
  const tripContext = useContext(TripContext)
  const eventContext = useContext(EventContext)

  const [tripName, setTripName] = useState('')
  const [tripStatus, setTripStatus] = useState('')

  const [titleDetails, setDetailsTitle] = useState('Detalhes')
  const [events, setEvents] = useState(null)
  const [participants, setParticipants] = useState([])
  const [isLoaded, setLoaded] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      setLoaded(false);
  
      try {
        const trip = await tripContext.showTrip(id);
        if (trip) {
          setTripName(trip.title);
          setTripStatus(trip.status);
        }
  
        const events = await eventContext.getEvents(id);
        if (events) {
          const adaptedEvents = events.map(event => ({
            id: event.id,
            id_trip: event.id_trip,
            id_category: event.id_category,
            title: event.title,
            start: new Date(event.start_datetime),
            end: new Date(event.end_datetime),
            description: event.description,
            destination: event.destination,
            cost: event.cost,
            share_cost: event.share_cost,
            individualCost: event.individualCost,
            category_name: event.category_name,
            participants: event.participants,
          }));
          setEvents(adaptedEvents);
        }
      } catch (error) {
        //
      } finally {
        setLoaded(true);
      }
    };
  
    loadData();
  }, [id]);

  const [selectedEvent, setSelectedEvent] = useState('Clique em um evento para ver mais detalhes sobre ele.')

  const handleEventClick = (event) => {
    setDetailsTitle('Descrição')
    setIsEventVisible(true)

    setParticipants(event.participants)

    setSelectedEvent(
      <>
        {event.title} <br />
        {event.description || 'Sem descrição'} <br />
        Inicia às: {new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </>
    )
  }

  const [isEventVisible, setIsEventVisible] = useState(true)
  const toggleVisibility = () => {
    if (titleDetails !== 'Detalhes') {
      setIsEventVisible(!isEventVisible)
      setDetailsTitle(isEventVisible ? 'Presença confirmada' : 'Descrição')
    }
  }

  const [selectedDate, setSelectedDate] = useState(new Date())

  const handleDayClick = async (date) => {
    setSelectedDate(date)

    const previousSelected = document.querySelector('.emphasis')
    if (previousSelected) {
      previousSelected.classList.remove('emphasis')
    }

    await new Promise((resolve) => setTimeout(resolve, 200))

    const formattedDate = moment(date).format('DD')
    const matchingElement = Array.from(document.querySelectorAll('.rbc-time-header-cell span.formattedDate')).find(
      (span) => span.textContent === formattedDate,
    )

    if (matchingElement) {
      matchingElement.classList.add('emphasis')
    }
  }

  const diasDaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

  if (!isLoaded) return <Loading />

  return (
    <Layout>
      <Card>
        <div className="grid-schedule overflow-hidden">
          <div className="border-x-slate-300">
            <h2 className="my-2 text-2xl font-bold w-full line-clamp-2">{tripName || "Nome da viagem"}</h2>
            <div className="flex flex-col gap-2 mb-5">
              <TravelStatus status={tripStatus || enumTravelStatus.planned} />

              <div className="calendar-container w-full mt-4">
                <Calendar
                  // onChange={setDate}
                  // value={date}
                  next2Label={null}
                  prev2Label={null}
                  onChange={handleDayClick}
                  className="w-full border-none"
                  locale="pt-BR"
                  formatShortWeekday={(locale, date) => diasDaSemana[date.getDay()]}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 mb-5 mt-8">
              <div className="flex justify-between items-center">
                <h4 className="text-md font-semibold">{titleDetails}</h4>
                <div className="flex gap-2 items-center ml-auto">
                  <ButtonIcon
                    color={enumButtonColor.transparentPrimary}
                    Icon={ChevronLeft}
                    size="30"
                    onClick={toggleVisibility}
                  />
                  <ButtonIcon
                    color={enumButtonColor.transparentPrimary}
                    Icon={ChevronRight}
                    size="30"
                    onClick={toggleVisibility}
                  />
                </div>
              </div>

              {isEventVisible && (
                <div className="flex bg-cardGray w-full min-h-64 rounded overflow-hidden items-center">
                  <h3 className="text-md p-6 text-left opacity-70">{selectedEvent}</h3>
                </div>
              )}

              {!isEventVisible && (
                <div className="flex bg-cardGray w-full min-h-64 rounded overflow-hidden items-center">
                  <div className="flex flex-col gap-2 p-6">
                    {participants.map((participant, index) => (
                      <Participant key={`participant-${index}`} imageSrc={participant.image_path} name={participant.name} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="h-full w-full gap-6 overflow-auto">
            <BigCalendar
              localizer={localizer}
              events={events || []}
              toolbar={false}
              startAccessor="start"
              endAccessor="end"
              defaultView="week"
              onNavigate={(newDate) => setSelectedDate(newDate)}
              min={new Date(2001, 1, 1, 6, 0)}
              className="max-h-full min-calendar"
              components={{
                header: CustomDayHeader,
              }}
              onSelectEvent={(event) => handleEventClick(event)}
              date={selectedDate}
            />
          </div>
        </div>
      </Card>
    </Layout>
  )
}
