import React, { useState } from 'react';
import { Plus } from 'react-feather';
import { Button, Input } from '../../components';
import { enumButtonColor } from '../../enums/enumButtonColor';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function AddTrip({ show, onClose }) {
  const [title, setTitle] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  if (!show) {
    return null;
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para salvar a viagem, por exemplo, enviando os dados para uma API
    console.log({
      title,
      destination,
      startDate,
      endDate,
      image
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="max-w-md mx-auto bg-white shadow-md rounded p-6 relative">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Criar nova viagem</h1>
          <button onClick={onClose} className="text-gray-500">X</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              value={title}
              id="title"
              onChange={(e) => setTitle(e.target.value)}
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
              label="Destino"
              type="text"
              required
            />
          </div>
          <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Data de Início</label>
              <DatePicker
                id="dateStart"
                selected={startDate}
                onChange={date => setStartDate(date)}
                className="rounded border border-gray focus:ring-secondary focus:border-secondary px-3 py-2 bg-white w-full"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Data de Fim</label>
              <DatePicker
                id="dateEnd"
                selected={endDate}
                onChange={date => setEndDate(date)}
                className="rounded border border-gray focus:ring-secondary focus:border-secondary px-3 py-2 bg-white w-full"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Imagem</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="rounded border border-gray focus:ring-secondary focus:border-secondary px-3 py-2 bg-white w-full"
            />
            {imagePreview && (
              <div className="mt-4">
                <img src={imagePreview} alt="Pré-visualização" className="w-full h-64 object-cover rounded" />
              </div>
            )}
          </div>
          <div className="flex justify-end space-x-4">
            <Button label="Cancelar" color={enumButtonColor.transparentPrimary} type="button" onClick={onClose} />
            <Button label="Cadastrar" color={enumButtonColor.primary} type="submit" Icon={Plus} />
          </div>
        </form>
      </div>
    </div>
  );
}
