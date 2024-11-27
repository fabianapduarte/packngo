import { X } from 'react-feather'

export const Modal = ({ onClose, title, children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-1">
      <div className="w-96 mx-auto bg-white shadow-md rounded p-6">
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
