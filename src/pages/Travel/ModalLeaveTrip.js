import { LogOut } from 'react-feather'
import { Button, Modal } from '../../components'
import { enumButtonColor } from '../../enums/enumButtonColor'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'

export const ModalLeaveTrip = ({ onClose, tripTitle }) => {
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()

  const handleExit = () => {
    enqueueSnackbar('Você saiu da viagem em grupo', { variant: 'success' })
    onClose()
    navigate('/home')
  }

  return (
    <Modal title="Sair da viagem em grupo" onClose={onClose}>
      <div className="flex flex-col gap-2">
        <p>
          Você tem certeza de que deseja sair do grupo {tripTitle}? Esta ação removerá sua participação e poderá
          impactar o planejamento. Confirme para prosseguir.
        </p>
      </div>
      <div className="mt-4 flex justify-end">
        <Button color={enumButtonColor.red} label="Sair" Icon={LogOut} onClick={handleExit} />
      </div>
    </Modal>
  )
}
