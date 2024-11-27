import { Check, Edit3, Trash2 } from 'react-feather'
import { ButtonOutlined, Modal } from '../../components'
import { enumButtonColor } from '../../enums/enumButtonColor'
import { useSnackbar } from 'notistack'

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
        <EventData label="Local" value={event.place} />
        <div className="grid grid-cols-2 gap-8">
          <EventData label="Data de início" value={`${event.dateStart} - ${event.timeStart}`} />
          <EventData label="Data final" value={`${event.dateEnd} - ${event.timeEnd}`} />
        </div>
        <div className="grid grid-cols-2 gap-8">
          <EventData label="Categoria" value={event.category} />
          <EventData label="Custo por participante" value={`R$ ${event.amount}`} />
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
