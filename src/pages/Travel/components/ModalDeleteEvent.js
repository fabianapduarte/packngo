import { useState, useContext, useEffect } from 'react'
import { Trash2 } from 'react-feather'
import { Button, Modal } from '../../../components'
import { enumButtonColor } from '../../../enums/enumButtonColor'
import { useSnackbar } from 'notistack'
import { EventContext } from '../../../context/EventContext'

export const ModalDeleteEvent = ({ onClose, event, onSuccess }) => {
  const { enqueueSnackbar } = useSnackbar()
  const eventContext = useContext(EventContext)

  const handleDelete = async() => {
    const events = await eventContext.deleteEvent(event.id_trip, event.id)
    await onSuccess()
    onClose()
  }

  return (
    <Modal title="Deseja excluir evento?" onClose={onClose} size="sm">
      <div className="flex flex-col gap-2">
        <p>
          Tem certeza de que deseja excluir esta evento? Todas as informações associadas serão permanentemente removidas
          para todos os participantes da viagem. Esta ação não poderá ser desfeita.
        </p>
      </div>
      <div className="mt-4 flex justify-end gap-4">
        <Button color={enumButtonColor.transparent} label="Cancelar" onClick={onClose} />
        <Button color={enumButtonColor.red} label="Excluir" Icon={Trash2} onClick={handleDelete} />
      </div>
    </Modal>
  )
}
