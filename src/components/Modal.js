import { X } from 'react-feather'

export const Modal = ({ onClose, title, children, size }) => {
  const sizeVariation = {
    sm: 'md:w-4/5 lg:w-1/3',
    md: 'md:w-4/5 lg:w-3/5',
    lg: 'md:w-4/5 lg:w-4/5',
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-1 min-h-screen min-w-screen p-4">
      <div className={`${sizeVariation[size]} bg-white shadow-md rounded p-6 m-4 max-h-full overflow-auto`}>
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
