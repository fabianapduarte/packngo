import { useRef, useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  LogOut,
  UserPlus,
} from 'react-feather'

import imgParticipantOne from '../../assets/avatar1.png'
import imgParticipantTwo from '../../assets/avatar2.png'
import imgParticipantThree from '../../assets/avatar3.png'
import data from '../../assets/data.json'
import {
  ButtonOutlined,
  ButtonIcon,
  Card,
  Layout,
  Participant,
  TravelStatus,
} from '../../components'
import { enumTravelStatus } from '../../enums/enumTravelStatus'
import { enumButtonColor } from '../../enums/enumButtonColor'

import Calendar from 'react-calendar';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar' ;
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'; 
import 'moment/locale/pt-br';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import './styles.css'

const localizer = momentLocalizer(moment); const events = [ 
  { 
    title: 'Reunião Web I',
    start: new Date(2024, 10, 27, 15, 0),
    end: new Date(2024, 10, 27, 17, 0), 
    desc: 'Reunião com grupo de Web I - Tema react',
  },
  { 
    title: 'Almoço especial',
    start: new Date(2024, 10, 28, 12, 0),
    end: new Date(2024, 10, 28, 13, 15), 
    desc: 'Almoço com amigos no restaurante central',
  },
  { 
    title: 'Almoço especial',
    start: new Date(2024, 10, 29, 12, 0),
    end: new Date(2024, 10, 29, 13, 15), 
    desc: 'Almoço com a equipe para planejar próximos passos',
  },
  { 
    title: 'Trilha',
    start: new Date(2024, 10, 29, 8, 0),
    end: new Date(2024, 10, 29, 9, 30), 
    desc: 'Caminhada matinal na trilha do parque',
  },
  { 
    title: 'Coffee break',
    start: new Date(2024, 10, 29, 15, 0),
    end: new Date(2024, 10, 29, 16, 30), 
    desc: 'Pausa para café com snacks na sala de reuniões',
  },
];

const CustomDayHeader = ({ date, label }) => {
  const formattedDate = moment(date).format('DD');
  const dayName = moment(date).format('ddd');

  return (
    <div className="flex flex-col items-center">
      <span className='dayName'>{dayName}</span>
      <span className='formattedDate'>{formattedDate}</span>
    </div>
  );
};

export const Schedule = () => {
  const isParticipant = false
  const polls = data[0].trips[0].polls
  const [checklist, setChecklist] = useState(data[0].trips[0].checklist)
  const [newItemOnChecklist, setNewItemOnChecklist] = useState(false)

  const [titleDetails, setDetailsTitle] = useState("Detalhes");

  const [selectedEvent, setSelectedEvent] = useState("Clique em um evento para ver mais detalhes sobre ele.");
  const handleEventClick = (eventTitle, eventDesc, eventStart) => {
    setDetailsTitle("Descrição");
    setIsEventVisible(true);

    setSelectedEvent(
      <>
        {eventTitle} <br /> 
        {eventDesc || "Sem descrição"} <br />
        Inicia às: {new Date(eventStart).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </>
    );
  };

  const [isEventVisible, setIsEventVisible] = useState(true);
  const toggleVisibility = () => {
    if (titleDetails !== "Detalhes") {
      setIsEventVisible(!isEventVisible);
      setDetailsTitle(isEventVisible ? "Presença confirmada" : "Descrição");
    }
  };

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDayClick = async (date) => {
    setSelectedDate(date);

    const previousSelected = document.querySelector('.emphasis');
    if (previousSelected) {
      previousSelected.classList.remove('emphasis');
    }

    await new Promise(resolve => setTimeout(resolve, 200));

    const formattedDate = moment(date).format('DD');
    const matchingElement = Array.from(document.querySelectorAll('.rbc-time-header-cell span.formattedDate')).find(
      (span) => span.textContent === formattedDate
    );

    if (matchingElement) {
      matchingElement.classList.add('emphasis');
    }
  };

  return (
    <Layout>
      <Card>
        <div className="grid-schedule overflow-hidden">
          <div className='border-x-slate-300'> {/* sm:border-r-none xl:border-r-[1px] */}
            <h2 className="my-2 text-2xl font-bold w-full line-clamp-2">Viagem de fim de ano</h2>
            <div className="flex flex-col gap-2 mb-5">
              <TravelStatus status={enumTravelStatus.progress} />

              {/* CALENDARIO */}
              <div className="calendar-container w-full mt-4">
                <Calendar 
                  // onChange={setDate}
                  // value={date}
                  next2Label={null}
                  prev2Label={null}
                  onChange={handleDayClick}
                  className="w-full border-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-5 mt-8">
              <div className="flex justify-between items-center">
                <h4 className="text-md">{titleDetails}</h4>
                <div className="flex gap-2 items-center ml-auto">
                  <ButtonIcon color={enumButtonColor.transparentPrimary} Icon={ChevronLeft} size="30" onClick={toggleVisibility}/>
                  <ButtonIcon color={enumButtonColor.transparentPrimary} Icon={ChevronRight} size="30" onClick={toggleVisibility}/>
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
                    {/* <div className="mb-1 font-bold">Participantes</div> */}
                    <Participant imageSrc={imgParticipantOne} name="Leonardo Oliveira" />
                    <Participant imageSrc={imgParticipantTwo} name="Maria da Silva" />
                    <Participant imageSrc={imgParticipantThree} name="Rafael Rodrigues" />
                  </div>
                </div>
              )}

            </div>
          </div>

          <div className="flex flex-col h-full gap-6 overflow-hidden">

            {/* WEEK */}
            <div > 
              <BigCalendar 
              localizer={localizer}
              events={events}
              toolbar={false}
              startAccessor="start"
              endAccessor="end"
              defaultView="week"
              min={new Date(2001, 1, 1, 6, 0)} 
              className='max-h-full overflow-auto' 
              components={{
                header: CustomDayHeader, 
              }}

              onSelectEvent={(event) => handleEventClick(event.title, event.desc, event.start)}
              date={selectedDate}
              /> 
            </div>
          </div>
            
        </div>
      </Card>
    </Layout>
  )
}
