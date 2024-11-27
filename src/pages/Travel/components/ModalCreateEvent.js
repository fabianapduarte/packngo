import { Plus } from 'react-feather'
import { Button, Checkbox, Input, Modal, Select, TextArea } from '../../../components'
import { enumButtonColor } from '../../../enums/enumButtonColor'
import { useSnackbar } from 'notistack'

export const ModalCreateEvent = ({ onClose }) => {
  const { enqueueSnackbar } = useSnackbar()

  const handleCreate = () => {
    enqueueSnackbar('Evento criado com sucesso!', { variant: 'success' })
    onClose()
  }

  return (
    <Modal title="Criar novo evento" onClose={onClose} size="md">
      <div className="flex flex-col gap-3 w-full mb-4">
        <Input id="title" label="Título" type="text" required />
        <TextArea id="description" label="Descrição" />
        <Input id="place" label="Local" type="text" />
        <div className="grid grid-cols-2 gap-4">
          <Input type="date" label="Data de início" id="dateStart" required />
          <Input type="time" label="Hora de início" id="timeStart" required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input type="date" label="Data final" id="dateEnd" required />
          <Input type="time" label="Hora final" id="timeEnd" required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input type="number" label="Custo médio" id="amount" required />
          <Select label="Categoria">
            <option value="-1" disabled selected>
              Selecione uma opção
            </option>
            <option value="0">Transporte</option>
            <option value="1">Hospedagem</option>
            <option value="2">Atividades</option>
            <option value="3">Alimentação</option>
            <option value="4">Compras</option>
            <option value="5">Encontros</option>
            <option value="6">Lazer e Entretenimento</option>
          </Select>
        </div>
        <Checkbox isChecked={false} name="share-cost" text="Dividir custo entre participantes do evento" />
      </div>
      <div className="mt-4 flex justify-end gap-4">
        <Button color={enumButtonColor.transparent} label="Cancelar" onClick={onClose} />
        <Button color={enumButtonColor.primary} label="Cadastrar" Icon={Plus} onClick={handleCreate} />
      </div>
    </Modal>
  )
}
