import { Check, Edit3, Trash2, X } from 'react-feather'
import { ButtonOutlined, Modal } from '../../../components'
import { enumButtonColor } from '../../../enums/enumButtonColor'
import { formatDatetime } from '../../../utils/dateFormat'
import { useContext, useState } from 'react'
import { EventContext } from '../../../context/EventContext'
import { UserContext } from '../../../context/AuthContext'

export const ModalSeeEvent = ({ onClose, event, openDeleteModal, openEditModal }) => {
  const { user } = useContext(UserContext)
  const eventContext = useContext(EventContext)
  const [isParticipant, setIsParticipant] = useState(
    event.participants.some((participant) => participant.id === user.id),
  )

  const handleConfirmPresence = async () => {
    const { success } = await eventContext.joinEvent(event.id_trip, event.id)
    if (success) setIsParticipant(true)
  }

  const handleCancelPresence = async () => {
    const { success } = await eventContext.leaveEvent(event.id_trip, event.id)
    if (success) setIsParticipant(false)
  }

  const handleDeleteEvent = () => {
    onClose()
    openDeleteModal()
  }

  const handleEditEvent = () => {
    onClose()
    openEditModal()
  }

  const EventData = ({ label, value }) => (
    <div className="flex flex-col gap-1">
      <div className="font-semibold">{label}</div>
      <div>{value}</div>
    </div>
  )

  return (
    <Modal title={event.title} onClose={onClose} size="md">
      <div className="flex flex-col gap-3">
        {event.description && <EventData label="Descrição" value={event.description} />}
        <EventData label="Local" value={event.destination} />
        <div className="grid grid-cols-2 gap-8">
          <EventData label="Data de início" value={formatDatetime(event.start_datetime)} />
          <EventData label="Data final" value={formatDatetime(event.end_datetime)} />
        </div>
        <div className="grid grid-cols-2 gap-8">
          <EventData label="Categoria" value={event.category_name} />
          <EventData label="Custo por participante" value={`R$ ${event.individual_cost}`} />
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <div className="flex gap-2">
          <ButtonOutlined color={enumButtonColor.primary} label="Editar" Icon={Edit3} onClick={handleEditEvent} />
          <ButtonOutlined color={enumButtonColor.red} label="Excluir" Icon={Trash2} onClick={handleDeleteEvent} />
        </div>
        {isParticipant && (
          <ButtonOutlined
            color={enumButtonColor.primary}
            label="Cancelar presença"
            Icon={X}
            onClick={handleCancelPresence}
          />
        )}
        {!isParticipant && (
          <ButtonOutlined
            color={enumButtonColor.primary}
            label="Confirmar presença"
            Icon={Check}
            onClick={handleConfirmPresence}
          />
        )}
      </div>
    </Modal>
  )
}
