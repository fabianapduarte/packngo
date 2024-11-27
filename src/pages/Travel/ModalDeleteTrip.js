import { Trash2 } from 'react-feather'
import { Button, Modal } from '../../components'
import { enumButtonColor } from '../../enums/enumButtonColor'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'

export const ModalDeleteTrip = ({ onClose }) => {
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()

  const handleDelete = () => {
    enqueueSnackbar('Viagem em grupo excluída', { variant: 'success' })
    onClose()
    navigate('/home')
  }

  return (
    <Modal title="Deseja excluir viagem?" onClose={onClose}>
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
