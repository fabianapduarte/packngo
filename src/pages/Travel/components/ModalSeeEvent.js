import { Check, Edit3, Trash2 } from 'react-feather'
import { ButtonOutlined, Modal } from '../../../components'
import { enumButtonColor } from '../../../enums/enumButtonColor'
import { useSnackbar } from 'notistack'
import { dateFormat, formatDatetime } from '../../../utils/dateFormat'

export const ModalSeeEvent = ({ onClose, event, openDeleteModal, openEditModal }) => {
  const { enqueueSnackbar } = useSnackbar()

  const handleConfirmPresence = () => {
    enqueueSnackbar('Presença confirmada', { variant: 'success' })
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
        <EventData label="Descrição" value={event.description} />
        <EventData label="Local" value={event.destination} />
        <div className="grid grid-cols-2 gap-8">
          <EventData label="Data de início" value={formatDatetime(event.start_datetime)} />
          <EventData label="Data final" value={formatDatetime(event.end_datetime)} />
        </div>
        <div className="grid grid-cols-2 gap-8">
          <EventData label="Categoria" value={event.id_category} />
          <EventData label="Custo por participante" value={`R$ ${event.cost}`} />
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <div className="flex gap-2">
          <ButtonOutlined color={enumButtonColor.primary} label="Editar" Icon={Edit3} onClick={handleEditEvent} />
          <ButtonOutlined color={enumButtonColor.red} label="Excluir" Icon={Trash2} onClick={handleDeleteEvent} />
        </div>
        <ButtonOutlined
          color={enumButtonColor.primary}
          label="Confirmar presença"
          Icon={Check}
          onClick={handleConfirmPresence}
        />
      </div>
    </Modal>
  )
}
