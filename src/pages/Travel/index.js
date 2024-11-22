import { Calendar, DollarSign, Edit3, MapPin, Trash2, UserPlus } from 'react-feather'
import img from '../../assets/london.jpg'
import imgParticipantOne from '../../assets/avatar1.png'
import imgParticipantTwo from '../../assets/avatar2.png'
import imgParticipantThree from '../../assets/avatar3.png'
import { ButtonOutlined } from '../../components/ButtonOutlined'
import { Card } from '../../components/Card'
import { Layout } from '../../components/Layout'
import { TravelStatus } from '../../components/TravelStatus'
import { Participant } from '../../components/Participant'
import { enumTravelStatus } from '../../enums/enumTravelStatus'
import './styles.css'
import { enumButtonColor } from '../../enums/enumButtonColor'

const InfoItem = ({ Icon, text }) => {
  return (
    <span className="flex gap-1 items-center">
      <Icon size={16} />
      <div>{text}</div>
    </span>
  )
}

export const Travel = () => {
  return (
    <Layout>
      <div className="grid-travel">
        <Card>
          <img src={img} alt="Imagem da viagem" className="rounded object-cover img-card self-center" />
          <h2 className="mt-2 mb-5 text-2xl font-bold w-full">Viagem de fim de ano</h2>
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
            <ButtonOutlined color={enumButtonColor.primary} label="Adicionar participante" Icon={UserPlus} />
          </div>
        </Card>
      </div>
    </Layout>
  )
}
