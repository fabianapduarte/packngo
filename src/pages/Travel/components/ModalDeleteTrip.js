import React, { useContext } from 'react'
import { Trash2 } from 'react-feather'
import { Button, Modal } from '../../../components'
import { enumButtonColor } from '../../../enums/enumButtonColor'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'
import { homeRoute } from '../../../utils/routes'
import { useParams } from 'react-router-dom'
import { TripContext } from '../../../context/TripContext'

export const ModalDeleteTrip = ({ onClose }) => {
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const { id } = useParams()
  const tripContext = useContext(TripContext)

  const handleDelete = async () => {
    const result = await tripContext.deleteTrip(id)
    if (result.success) {
      enqueueSnackbar('Viagem em grupo excluída', { variant: 'success' })
      onClose()
      navigate(homeRoute)
    } else {
      enqueueSnackbar('Não foi possível deletar a viagem no momento. Tente novamente mais tarde.', { variant: 'error' })
    }
  }

  return (
    <Modal title="Deseja excluir viagem?" onClose={onClose} size="sm">
      <div className="flex flex-col gap-2">
        <p>
          Tem certeza de que deseja excluir esta viagem? Todas as informações associadas, incluindo os eventos, serão
          permanentemente removidas. Esta ação não poderá ser desfeita.
        </p>
      </div>
      <div className="mt-4 flex justify-end gap-4">
        <Button color={enumButtonColor.transparent} label="Cancelar" onClick={onClose} />
        <Button color={enumButtonColor.red} label="Excluir" Icon={Trash2} onClick={handleDelete} />
      </div>
    </Modal>
  )
}
