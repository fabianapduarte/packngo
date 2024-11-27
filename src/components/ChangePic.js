import React, { useState } from 'react';
import { Plus, RefreshCw } from 'react-feather';
import { Button, Input } from '.';
import { enumButtonColor } from '../enums/enumButtonColor';

export const ChangePic = ({ show, onClose, imgClass}) => {
  const [image, setImage] = useState("https://placehold.co/400x400@2x.png");
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
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTrip = {
      image: image,
      checklist: [],
      events: [],
      polls: [],
    };
    onClose();
  };

  const refresh = (e) => {
    e.preventDefault();
  
    if (imagePreview) {
      const profileImage = document.querySelector(imgClass);
      
      if (profileImage) {
        profileImage.src = imagePreview;
      }
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-1">
      <div className="max-w-lg mx-auto bg-white shadow-md rounded p-6 relative">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Nova imagem</h1>
          <button onClick={onClose} className="text-gray-500">X</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
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
            <Button label="Atualizar" color={enumButtonColor.primary} type="submit" Icon={RefreshCw} onClick={refresh}/>
          </div>
        </form>
      </div>
    </div>
  );
}
