import { Clipboard } from 'react-feather'
import { Button, Modal } from '../../components'
import { enumButtonColor } from '../../enums/enumButtonColor'
import { useSnackbar } from 'notistack'

export const ModalAddParticipant = ({ code, onClose }) => {
  const { enqueueSnackbar } = useSnackbar()

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code)
    enqueueSnackbar('Código copiado com sucesso!', { variant: 'success' })
    onClose()
  }

  return (
    <Modal title="Adicionar participantes" onClose={onClose}>
      <div className="flex flex-col gap-2">
        <p>Compartilhe o código com as pessoas que você deseja incluir no grupo da viagem.</p>
        <div className="text-center text-xl font-bold">{code}</div>
      </div>
      <div className="mt-4 flex justify-end">
        <Button color={enumButtonColor.primary} label="Copiar código" Icon={Clipboard} onClick={handleCopyCode} />
      </div>
    </Modal>
  )
}
