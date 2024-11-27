import { useRef, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CheckSquare,
  DollarSign,
  Edit3,
  LogOut,
  MapPin,
  Plus,
  Trash2,
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
  Checkbox,
  Layout,
  Participant,
  SimpleInput,
  TextButton,
  Tooltip,
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
  { title: 'Reunião Web I', start: new Date(2024, 10, 27, 15, 0),
    end: new Date(2024, 10, 27, 17, 0), },
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

const CARD_WIDTH = 210


export const Schedule = () => {
  const isParticipant = false
  const polls = data[0].trips[0].polls
  const [checklist, setChecklist] = useState(data[0].trips[0].checklist)
  const [newItemOnChecklist, setNewItemOnChecklist] = useState(false)
  const [currentOffsetEventsContainer, setCurrentOffsetEventsContainer] = useState(0)
  const [currentOffsetPollsContainer, setCurrentOffsetPollsContainer] = useState(0)

  

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
                  className="w-full border-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-5 mt-8">
              <div className="flex justify-between items-center">
                <h4 className="text-md">Detalhes</h4>
                <div className="flex gap-2 items-center ml-auto">
                  <ButtonIcon color={enumButtonColor.transparentPrimary} Icon={ChevronLeft} size="30" />
                  <ButtonIcon color={enumButtonColor.transparentPrimary} Icon={ChevronRight} size="30" />
                </div>
              </div>

              <div className='flex bg-cardGray w-full min-h-64 rounded overflow-hidden items-center'>
                <h3 className='text-md p-6 text-left opacity-50'>Clique em um evento para ver mais detalhes sobre ele.</h3>
              </div>
            </div>

            {/* <div className="flex flex-col gap-2">
              <div className="mb-1 font-bold">Participantes</div>
              <Participant imageSrc={imgParticipantOne} name="Leonardo Oliveira" />
              <Participant imageSrc={imgParticipantTwo} name="Maria da Silva" />
              <Participant imageSrc={imgParticipantThree} name="Rafael Rodrigues" />
              {isParticipant && (
                <ButtonOutlined color={enumButtonColor.primary} label="Sair da viagem em grupo" Icon={LogOut} />
              )}
              {!isParticipant && (
                <ButtonOutlined color={enumButtonColor.primary} label="Adicionar participante" Icon={UserPlus} />
              )}
            </div> */}
          </div>

          <div className="flex flex-col h-full gap-6 overflow-hidden">
            <div className="absolute min-w-auto mt-2 flex justify-between items-center"> 
              <div className="flex gap-2 items-center mr-auto">
                <ButtonIcon color={enumButtonColor.transparentPrimary} Icon={ChevronLeft} size="30" />
              </div>
              <div className="flex gap-2 items-center ml-auto right-0">
                <ButtonIcon color={enumButtonColor.transparentPrimary} Icon={ChevronRight} size="30" />
              </div>
            </div>

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
              /> 
            </div>
          </div>
            
        </div>
      </Card>
    </Layout>
  )
}
