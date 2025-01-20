import { useState, useContext } from 'react'
import { Plus, X } from 'react-feather'
import { Button, Input, Modal, TextButton } from '../../../components'
import { enumButtonColor } from '../../../enums/enumButtonColor'

import { PollContext } from '../../../context/PollContext'

export const ModalCreatePoll = ({ onClose, onSuccess, idTrip }) => {
  const initialOptions = ['Opção 1', 'Opção 2']
  const [title, setTitle] = useState('Nova enquete')
  const [options, setOptions] = useState(initialOptions)

  const pollContext = useContext(PollContext)

  const handleCreate = async () => {
    const filteredOptions = options.filter((option) => option.length > 0)
    const data = await pollContext.addPoll({ title, options: filteredOptions, idTrip })
    if (data.success) {
      onSuccess()
      onClose()
    }
  }

  const handleAddOption = () => {
    const newOptions = [...options, '']
    setOptions(newOptions)
  }

  const handleDeleteOption = (indexToDelete) => {
    const newOptions = options.filter((_, index) => index !== indexToDelete)
    setOptions(newOptions)
  }

  const handleChangeOption = (e) => (indexToUpdate) => {
    const optionsUpdated = options.map((option, index) => {
      if (index === indexToUpdate) return e.target.value
      else return option
    })
    console.log(optionsUpdated)
    setOptions(optionsUpdated)
  }

  const OptionInput = ({ id, required, value, handleChangeOption }) => (
    <div className="flex gap-4 items-center">
      <input
        onBlur={(e) => handleChangeOption(e)(id)}
        defaultValue={value}
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
            <OptionInput
              key={index}
              id={index}
              value={option}
              required={index === 0 || index === 1}
              handleChangeOption={handleChangeOption}
            />
          ))}
        </div>
        <TextButton label="Adicionar opção" Icon={Plus} onClick={handleAddOption} />
      </div>
      <div className="mt-4 flex justify-end gap-4">
        <Button color={enumButtonColor.transparent} label="Cancelar" onClick={onClose} />
        <Button color={enumButtonColor.primary} label="Criar" Icon={Plus} onClick={handleCreate} />
      </div>
    </Modal>
  )
}
