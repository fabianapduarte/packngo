import { Calendar, CheckSquare, DollarSign, Edit3, LogOut, MapPin, Plus, Trash2, UserPlus } from 'react-feather'
import img from '../../assets/london.jpg'
import imgParticipantOne from '../../assets/avatar1.png'
import imgParticipantTwo from '../../assets/avatar2.png'
import imgParticipantThree from '../../assets/avatar3.png'
import { ButtonOutlined, Card, Checkbox, Layout, Participant, TextButton, TravelStatus } from '../../components'

import { enumTravelStatus } from '../../enums/enumTravelStatus'
import { enumButtonColor } from '../../enums/enumButtonColor'

import './styles.css'

const InfoItem = ({ Icon, text }) => {
  return (
    <span className="flex gap-1 items-center">
      <Icon size={16} />
      <div>{text}</div>
    </span>
  )
}

const ChecklistItem = ({ text, isChecked }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-full">
        <Checkbox text={text} isChecked={isChecked} />
      </div>
      <Trash2 size={16} color="#BCC1BA" />
    </div>
  )
}

export const Travel = () => {
  const isParticipant = false

  return (
    <Layout>
      <div className="grid-travel">
        <Card>
          <img src={img} alt="Imagem da viagem" className="rounded object-cover img-card self-center" />
          <h2 className="mt-2 mb-5 text-2xl font-bold w-full line-clamp-2">Viagem de fim de ano</h2>
          <div className="flex flex-col gap-2 mb-5">
            <div className="mb-1 font-bold">Informações</div>
            <TravelStatus status={enumTravelStatus.progress} />
            <InfoItem Icon={MapPin} text="Londres" />
            <InfoItem Icon={Calendar} text="01/12/2024 - 10/12/2024" />
            <InfoItem Icon={DollarSign} text="R$ 7500,00" />
            <div className="flex gap-2">
              <ButtonOutlined color={enumButtonColor.primary} label="Editar" Icon={Edit3} />
              <ButtonOutlined color={enumButtonColor.red} label="Excluir" Icon={Trash2} />
            </div>
          </div>
          <div className="flex flex-col gap-2">
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
          </div>
        </Card>

        <div className="flex flex-col gap-6">
          <Card>
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
              <h3 className="font-bold text-xl">Eventos</h3>
              <div className="flex flex-wrap gap-4">
                <ButtonOutlined color={enumButtonColor.primary} label="Ver agenda" Icon={Calendar} />
                <ButtonOutlined color={enumButtonColor.primary} label="Criar evento" Icon={Plus} />
              </div>
            </div>
            {/* <div className="w-full">
              <div className="snap-x snap-mandatory flex gap-4 overflow-x-auto w-max">
                <div className="snap-end snap-always">
                  <img src={img} alt="Imagem da viagem" className="rounded object-cover img-card self-center" />
                </div>
                <div className="snap-end snap-always">
                  <img src={img} alt="Imagem da viagem" className="rounded object-cover img-card self-center" />
                </div>
                <div className="snap-end snap-always">
                  <img src={img} alt="Imagem da viagem" className="rounded object-cover img-card self-center" />
                </div>
                <div className="snap-end snap-always">
                  <img src={img} alt="Imagem da viagem" className="rounded object-cover img-card self-center" />
                </div>
                <div className="snap-end snap-always">
                  <img src={img} alt="Imagem da viagem" className="rounded object-cover img-card self-center" />
                </div>
                <div className="snap-end snap-always">
                  <img src={img} alt="Imagem da viagem" className="rounded object-cover img-card self-center" />
                </div>
                <div className="snap-end snap-always">
                  <img src={img} alt="Imagem da viagem" className="rounded object-cover img-card self-center" />
                </div>
              </div>
            </div> */}
          </Card>
          <Card>
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
              <h3 className="font-bold text-xl">Enquetes</h3>
              <ButtonOutlined color={enumButtonColor.primary} label="Criar enquete" Icon={CheckSquare} />
            </div>
          </Card>
          <Card>
            <div className="flex flex-col">
              <h3 className="font-bold text-xl">Listas</h3>
              <div className="mt-6 mb-3 flex flex-col gap-2">
                <ChecklistItem text="Guardar passaporte" isChecked={true} />
                <ChecklistItem text="Confirmar reserva de voos de ida e volta" isChecked={true} />
                <ChecklistItem text="Confirmar hospedagem" isChecked={true} />
                <ChecklistItem text="Adicionar itinerários" isChecked={true} />
                <ChecklistItem text="Verificar previsão do tempo" isChecked={false} />
                <ChecklistItem text="Planejar transporte" isChecked={false} />
              </div>
              <TextButton label="Adicionar item" Icon={Plus} />
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  )
}
