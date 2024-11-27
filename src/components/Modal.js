import { X } from 'react-feather'

export const Modal = ({ onClose, title, children, size }) => {
  const sizeVariation = {
    sm: 'w-1/3',
    md: 'w-3/5',
    lg: 'w-4/5',
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-1">
      <div className={`${sizeVariation[size]} mx-auto bg-white shadow-md rounded p-6`}>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">{title}</h1>
          <button onClick={onClose}>
            <X size={20} color="#0A0A0A" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
