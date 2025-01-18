import React, { useState, useContext } from 'react'
import { Plus, Image } from 'react-feather'
import { useSnackbar } from 'notistack'
import defaultImgTrip from '../../assets/map.jpg'
import { Button, ButtonLoading, Input, Modal } from '../../components'
import { enumButtonColor } from '../../enums/enumButtonColor'
import { TripContext } from '../../context/TripContext'
import './styles.css'

export default function AddTrip({ show, onClose }) {
  const [title, setTitle] = useState('')
  const [destination, setDestination] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [imagePreview, setImagePreview] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const { enqueueSnackbar } = useSnackbar()
  const tripContext = useContext(TripContext)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
        setImageFile(file)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddTrip = async () => {
    if (title.length === 0 || destination.length === 0) {
      enqueueSnackbar('Preencha todos os campos', { variant: 'warning' })
    } else {
      await tripContext.addTrip({ title, destination, startDate, endDate, image: imageFile })
    }
  }

  if (!show) {
    return null
  }

  return (
    <Modal title="Criar nova viagem" size="sm" onClose={onClose}>
      <div>
        <div className="mb-4">
          <Input
            value={title}
            id="title"
            onChange={(e) => setTitle(e.target.value)}
            onEnter={handleAddTrip}
            label="Título"
            type="text"
            required
          />
        </div>
        <div className="mb-4">
          <Input
            value={destination}
            id="destination"
            onChange={(e) => setDestination(e.target.value)}
            onEnter={handleAddTrip}
            label="Destino"
            type="text"
            required
          />
        </div>
        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Data de Início</label>
            <Input
              type="date"
              id="dateStart"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              onEnter={handleAddTrip}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Data de Fim</label>
            <Input type="date" id="dateEnd" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
          </div>
        </div>
        <div className="mb-4">
          <div className="flex items-center space-x-4">
            <img
              src={imagePreview ? imagePreview : defaultImgTrip}
              alt="Pré-visualização"
              className="w-10 h-10 object-cover rounded"
            />
            <label
              htmlFor="imageInput"
              className="flex items-center cursor-pointer text-primary border border-primary hover:bg-primary hover:text-primary-foreground rounded px-4 py-2 w-fit"
            >
              {Image && (
                <span className="mr-2">
                  <Image size={16} />
                </span>
              )}
              Alterar Imagem
            </label>
            <input id="imageInput" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <Button
            label="Cancelar"
            color={enumButtonColor.transparentPrimary}
            type="button"
            onClick={onClose}
            disabled={tripContext.loading}
          />
          {tripContext.loading && <ButtonLoading color={enumButtonColor.primary} />}
          {!tripContext.loading && (
            <Button
              label="Cadastrar"
              color={enumButtonColor.primary}
              type="submit"
              Icon={Plus}
              onClick={handleAddTrip}
            />
          )}
        </div>
      </div>
    </Modal>
  )
}
