import { useState, useContext, useEffect } from 'react'
import { Plus } from 'react-feather'
import { Button, Checkbox, Input, Modal, Select, TextArea } from '../../../components'
import { enumButtonColor } from '../../../enums/enumButtonColor'
import { useSnackbar } from 'notistack'
import { useParams } from 'react-router-dom'
import { EventContext } from '../../../context/EventContext'

export const ModalCreateEvent = ({ onClose }) => {
  const { enqueueSnackbar } = useSnackbar()
  const [events, setEvents] = useState([])
  const { id } = useParams()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState()
  const [destination, setDestination] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [startDateTime, setStartDateTime] = useState('')
  const [endDateTime, setEndDateTime] = useState('')
  const [cost, setCost] = useState('')
  const [shareCost, setShareCost] = useState(false)
  const [idCategory, setIdCategory] = useState(-1)

  const eventContext = useContext(EventContext)

  const handleCreate = async () => {
    const data = await eventContext.addEvent({title, description, destination, startDate, endDate, startDateTime, endDateTime, cost, shareCost, idCategory, id})
    if(data){
      enqueueSnackbar('Evento criado com sucesso!', { variant: 'success' })
    }
    onClose()
  }

  const handleChangeCategory = async (category) => {  
    setIdCategory(category)
  }

  return (
    <Modal title="Criar novo evento" onClose={onClose} size="md">
      <div className="flex flex-col gap-3 w-full mb-4">
        <Input id="title" label="Título" type="text" required 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextArea id="description" label="Descrição" 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input id="place" label="Local" type="text" 
          value={destination} 
          onChange={(e) => setDestination(e.target.value)}
        />
        <div className="grid grid-cols-2 gap-4">
          <Input type="date" label="Data de início" id="dateStart" required 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)}
          />
          <Input type="time" label="Hora de início" id="timeStart" required 
            value={startDateTime} 
            onChange={(e) => setStartDateTime(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input type="date" label="Data final" id="dateEnd" required 
            value={endDate} 
            onChange={(e) => setEndDate(e.target.value)}
          />
          <Input type="time" label="Hora final" id="timeEnd" required 
            value={endDateTime} 
            onChange={(e) => setEndDateTime(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input type="number" label="Custo médio" id="amount" required 
            value={cost} onChange={(e) => setCost(e.target.value)}
          />
          <Select label="Categoria"
            value={idCategory === -1 ? "" : idCategory}
            onChange={(e) => handleChangeCategory(e.target.value)}
          >
            <option value="-1" disabled>
              Selecione uma opção
            </option>
            <option value="1">Alimentação</option>
            <option value="2">Atividades</option>
            <option value="3">Compras</option>
            <option value="4">Encontros</option>
            <option value="5">Hospedagem</option>
            <option value="6">Lazer e Entretenimento</option>
            <option value="7">Transporte</option>
          </Select>
        </div>
        <Checkbox name="share-cost" text="Dividir custo entre participantes do evento" 
          checked={shareCost}
          onChange={(e) => setShareCost(e.target.checked)}
        />
      </div>
      <div className="mt-4 flex justify-end gap-4">
        <Button color={enumButtonColor.transparent} label="Cancelar" onClick={onClose} />
        <Button color={enumButtonColor.primary} label="Cadastrar" Icon={Plus} onClick={handleCreate} />
      </div>
    </Modal>
  )
}
