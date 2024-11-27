import { useState } from 'react'
import { useSnackbar } from 'notistack'
import { Plus, X } from 'react-feather'
import { Button, Input, Modal, TextButton } from '../../components'
import { enumButtonColor } from '../../enums/enumButtonColor'

export const ModalCreatePoll = ({ onClose }) => {
  const initialOptions = [{ value: '' }, { value: '' }]
  const { enqueueSnackbar } = useSnackbar()
  const [title, setTitle] = useState('Nova enquete')
  const [options, setOptions] = useState(initialOptions)

  const handleDelete = () => {
    enqueueSnackbar('Enquete criada com sucesso!', { variant: 'success' })
    onClose()
  }

  const handleAddOption = () => {
    const newOptions = [...options, { value: '' }]
    setOptions(newOptions)
  }

  const handleDeleteOption = (indexToDelete) => {
    const newOptions = options.filter((_, index) => index !== indexToDelete)
    setOptions(newOptions)
  }

  const OptionInput = ({ id, required }) => (
    <div className="flex gap-4 items-center">
      <input
        name={`option-${id}`}
        type="text"
        required={true}
        className="rounded border border-gray focus:ring-secondary focus:border-secondary px-3 py-2 bg-white w-full"
      />
      {!required && <X size={20} color="#BCC1BA" className="cursor-pointer" onClick={() => handleDeleteOption(id)} />}
    </div>
  )

  return (
    <Modal title="Criar enquete" onClose={onClose} size="md">
      <div className="flex flex-col gap-3 w-full mb-4">
        <Input id="title" label="Título" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <div className="flex flex-col gap-2">
          <p>Opções</p>
          {options.map((option, index) => (
            <OptionInput key={index} id={index} required={index === 0 || index === 1} />
          ))}
        </div>
        <TextButton label="Adicionar opção" Icon={Plus} onClick={handleAddOption} />
      </div>
      <div className="mt-4 flex justify-end gap-4">
        <Button color={enumButtonColor.transparent} label="Cancelar" onClick={onClose} />
        <Button color={enumButtonColor.primary} label="Criar" Icon={Plus} onClick={handleDelete} />
      </div>
    </Modal>
  )
}
