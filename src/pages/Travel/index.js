import { useState } from 'react'
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
import imgParticipantTwo from '../../assets/avatar2.png'
import imgParticipantThree from '../../assets/avatar3.png'
import data from '../../assets/data.json'
import {
  ButtonOutlined,
  Card,
  Checkbox,
  Layout,
  Participant,
  SimpleInput,
  Slider,
  TextButton,
  Tooltip,
  TravelStatus,
} from '../../components'
import { enumTravelStatus } from '../../enums/enumTravelStatus'
import { enumButtonColor } from '../../enums/enumButtonColor'

import { ModalAddParticipant } from './ModalAddParticipant'
import { ModalLeaveTrip } from './ModalLeaveTrip'
import { ModalDeleteTrip } from './ModalDeleteTrip'
import { ModalCreatePoll } from './ModalCreatePoll'
import './styles.css'

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

const EventCard = ({ title, date, time }) => {
  return (
    <div className="card">
      <div className="p-4 rounded bg-cardGray card-slider block max-w-full">
        <h4 className="text-md font-bold text-ellipsis whitespace-nowrap overflow-hidden">{title}</h4>
        <div className="flex gap-2 items-center mb-3">
          <Calendar size={16} />
          <span>
            {date} - {time}
          </span>
        </div>
        <TextButton label="Ver evento" Icon={ArrowRight} />
      </div>
    </div>
  )
}

const PollCard = ({ title, open }) => {
  return (
    <div className="card">
      <div className="p-4 rounded bg-cardGray card-slider block max-w-full">
        <h4 className="text-md font-bold text-ellipsis whitespace-nowrap overflow-hidden">{title}</h4>
        {open && <div className="text-primary mb-3">Votação aberta</div>}
        {!open && <div className="text-red mb-3">Votação fechada</div>}
        <TextButton label="Ver votação" Icon={CheckSquare} />
      </div>
    </div>
  )
}

export const Travel = () => {
  const isParticipant = false
  const { events, polls, inviteCode, title } = data[0].trips[0]
  const { id } = useParams()

  const [checklist, setChecklist] = useState(data[0].trips[0].checklist)
  const [newItemOnChecklist, setNewItemOnChecklist] = useState(false)
  const [openModalAddParticipant, setOpenModalAddParticipant] = useState(false)
  const [openModalLeaveTrip, setOpenModalLeaveTrip] = useState(false)
  const [openModalDeleteTrip, setModalOpenDeleteTrip] = useState(false)
  const [openModalCreatePoll, setOpenModalCreatePoll] = useState(false)

  const handleDeleteItemOnChecklist = (indexToDelete) => {
    const newChecklist = checklist.filter((_, index) => index !== indexToDelete)
    setChecklist(newChecklist)
  }

  const handleChangeOnAddItem = (value) => {
    const newChecklist = [...checklist, { title: value, isChecked: false }]
    setChecklist(newChecklist)
    setNewItemOnChecklist(false)
  }

  return (
    <Layout>
      <div className="grid-travel">
        <Card>
          <img src={img} alt="Imagem da viagem" className="rounded object-cover img-card self-center" />
          <h2 className="mt-2 mb-5 text-2xl font-bold w-full line-clamp-2">{title}</h2>
          <div className="flex flex-col gap-2 mb-5">
            <div className="mb-1 font-bold">Informações</div>
            <TravelStatus status={enumTravelStatus.progress} />
            <InfoItem Icon={MapPin} text="Londres" />
            <InfoItem Icon={Calendar} text="01/12/2024 - 10/12/2024" />
            <Tooltip
              element={<InfoItem Icon={DollarSign} text="R$ 7500,00" />}
              text="Seu gasto individual previsto para a viagem"
            />
            <div className="flex gap-2">
              <ButtonOutlined color={enumButtonColor.primary} label="Editar" Icon={Edit3} />
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
            <Participant imageSrc={imgParticipantOne} name="Leonardo Oliveira" />
            <Participant imageSrc={imgParticipantTwo} name="Maria da Silva" />
            <Participant imageSrc={imgParticipantThree} name="Rafael Rodrigues" />
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
                <Link to={`/viagem/${id}/agenda`}>
                  <ButtonOutlined color={enumButtonColor.primary} label="Ver agenda" Icon={Calendar} />
                </Link>
                <ButtonOutlined color={enumButtonColor.primary} label="Criar evento" Icon={Plus} />
              </div>
            </div>
            <Slider
              noElementsMessage="Não há eventos cadastrados."
              elements={events.map((event, index) => (
                <EventCard key={`event-${index}`} title={event.title} date={event.date} time={event.time} />
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
                polls.map((poll, index) => <PollCard key={`poll-${index}`} title={poll.title} open={poll.open} />)
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

      {openModalAddParticipant && (
        <ModalAddParticipant code={inviteCode} onClose={() => setOpenModalAddParticipant(false)} />
      )}

      {openModalLeaveTrip && <ModalLeaveTrip tripTitle={title} onClose={() => setOpenModalLeaveTrip(false)} />}

      {openModalDeleteTrip && <ModalDeleteTrip onClose={() => setModalOpenDeleteTrip(false)} />}

      {openModalCreatePoll && <ModalCreatePoll onClose={() => setOpenModalCreatePoll(false)} />}
    </Layout>
  )
}
