import React, { useState } from 'react';
import { LogIn } from 'react-feather';
import { Button, Input } from '../../components';
import { enumButtonColor } from '../../enums/enumButtonColor';
import "./styles.css";

export default function JoinTrip({ show, onClose, onJoinTrip }) {
  const [step, setStep] = useState(1);
  const [code, setCode] = useState('');

  if (!show) {
    return null;
  }

  const handleNext = () => {
    setStep(step + 1);
  };
  const handlePrev = () => {
    setStep(step - 1);
  };

}; const handleSubmit = (e) => {
  e.preventDefault();
  // TODO Codigo de submit
  onClose();
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-1">
      <div className="max-w-md mx-auto bg-white shadow-md rounded p-6 relative">
        {step === 1 && (
          <div className="flex justify-between items-center mb-4">          
            <h1 className="text-xl font-bold">Entrar em uma viagem</h1>
            <button onClick={onClose} className="text-gray-500">X</button>
          </div>
          <form>
            <div className="mb-4">
              <Input
                value={code}
                id="code"
                onChange={(e) => setCode(e.target.value)}
                label="Código"
                type="text"
                required
              />
            </div>          
          </form>
        )}
        {step === 2 && (
          <div className="flex justify-between items-center mb-4">          
          <h1 className="text-xl font-bold">Entrar em uma viagem</h1>
          <button onClick={onClose} className="text-gray-500">X</button>
        </div>
        <form>
          <div className="mb-4">
            <Input
              value={code}
              id="code"
              onChange={(e) => setCode(e.target.value)}
              label="Código"
              type="text"
              required
            />
          </div>          
        </form>
        )}
      </div>
    </div>
  );
}