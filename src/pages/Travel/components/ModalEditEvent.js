import { useState, useContext } from 'react'
import { Save } from 'react-feather'
import { Button, Checkbox, Input, Modal, Select, TextArea } from '../../../components'
import { enumButtonColor } from '../../../enums/enumButtonColor'
import { useParams } from 'react-router-dom'
import { EventContext } from '../../../context/EventContext'

export const ModalEditEvent = ({ onClose, event, onSuccess }) => {
  const { id } = useParams()

  //remove the seconds
  const getHour = (datetime) => datetime.split(' ')[1].slice(0, -3)

  const [title, setTitle] = useState(event.title)
  const [description, setDescription] = useState(event.description)
  const [destination, setDestination] = useState(event.destination)
  const [startDate, setStartDate] = useState(event.start_datetime.split(' ')[0])
  const [startDateTime, setStartDateTime] = useState(getHour(event.start_datetime))
  const [endDateTime, setEndDateTime] = useState(getHour(event.end_datetime))
  const [cost, setCost] = useState(event.cost)
  const [shareCost, setShareCost] = useState(event.shareCost)
  const [idCategory, setIdCategory] = useState(event.id_category)

  const eventContext = useContext(EventContext)

  const handleEdit = async () => {
    await eventContext.editEvent({
      title,
      description,
      destination,
      startDate,
      startDateTime,
      endDateTime,
      cost,
      shareCost,
      idCategory,
      idEvent: event.id,
      id,
      handleSuccess,
    })
  }

  const handleSuccess = async () => {
    await onSuccess()
    onClose()
  }

  const handleChangeCategory = async (category) => {
    setIdCategory(category)
  }

  return (
    <Modal title="Editar evento" onClose={onClose} size="md">
      <div className="flex flex-col gap-3 w-full mb-4">
        <Input
          id="title"
          label="Título"
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextArea
          id="description"
          label="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          id="place"
          label="Local"
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="date"
            label="Data de início"
            id="dateStart"
            required
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="time"
              label="Hora de início"
              id="timeStart"
              required
              value={startDateTime}
              onChange={(e) => setStartDateTime(e.target.value)}
            />
            <Input
              type="time"
              label="Hora final"
              id="timeEnd"
              required
              value={endDateTime}
              onChange={(e) => setEndDateTime(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="number"
            label="Custo médio"
            id="amount"
            required
            value={cost}
            onChange={(e) => setCost(e.target.value)}
          />
          <Select label="Categoria" value={idCategory} onChange={(e) => handleChangeCategory(e.target.value)}>
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
        <Checkbox
          name="share-cost"
          text="Dividir custo entre participantes do evento"
          checked={shareCost}
          onChange={(e) => setShareCost(e.target.checked)}
        />
      </div>
      <div className="mt-4 flex justify-end gap-4">
        <Button color={enumButtonColor.transparent} label="Cancelar" onClick={onClose} />
        <Button color={enumButtonColor.primary} label="Salvar" Icon={Save} onClick={handleEdit} />
      </div>
    </Modal>
  )
}
