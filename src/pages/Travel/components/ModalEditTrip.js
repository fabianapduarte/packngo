import { useState, useContext } from 'react'
import { Image, Save } from 'react-feather'
import { Button, Input, Modal } from '../../../components'
import { enumButtonColor } from '../../../enums/enumButtonColor'
import { useSnackbar } from 'notistack'
import { useParams } from 'react-router-dom'
import { UserContext } from '../../../context/UserContext'

export const ModalEditTrip = ({ onClose, travel }) => {
  const { enqueueSnackbar } = useSnackbar()

  const [title, setTitle] = useState(travel.title)
  const [destination, setDestination] = useState(travel.destination)
  const [startDate, setStartDate] = useState(travel.startDate)
  const [endDate, setEndDate] = useState(travel.endDate)
  const [image, setImage] = useState(
    'https://images.unsplash.com/photo-1553864250-05b20249ee0c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  )

  const { id } = useParams()
  const userContext = useContext(UserContext)
  const [trip, setTrip] = useState(null);

  const handleEdit = () => {
    enqueueSnackbar('Viagem editada com sucesso!', { variant: 'success' })
    onClose()
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Modal title="Editar evento" onClose={onClose} size="sm">
      <div className="flex flex-col gap-3 w-full mb-4">
        <Input
          value={title}
          id="title"
          onChange={(e) => setTitle(e.target.value)}
          label="Título"
          type="text"
          required
        />
        <Input
          value={destination}
          id="destination"
          onChange={(e) => setDestination(e.target.value)}
          label="Destino"
          type="text"
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <Input type="date" id="dateStart" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
          <Input type="date" id="dateEnd" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
        </div>
        <div className="flex items-center space-x-4">
          <img src={image} alt="Pré-visualização" className="w-10 h-10 object-cover rounded" />
          <label
            htmlFor="imageInput"
            className="flex items-center cursor-pointer text-primary border border-primary hover:bg-primary hover:text-primary-foreground rounded px-4 py-2 w-fit"
          >
            <span className="mr-2">
              <Image size={16} />
            </span>
            Alterar Imagem
          </label>
          <input id="imageInput" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
        </div>
      </div>
      <div className="mt-4 flex justify-end gap-4">
        <Button color={enumButtonColor.transparent} label="Cancelar" onClick={onClose} />
        <Button color={enumButtonColor.primary} label="Salvar" Icon={Save} onClick={handleEdit} />
      </div>
    </Modal>
  )
}
