export const ButtonOutlined = ({ label, color, Icon = null, onClick, disabled = false, size = 'fit' }) => {
  const colorVariants = {
    primary: 'text-primary border-primary hover:bg-primary hover:text-primary-foreground',
    red: 'text-red border-red hover:bg-red hover:text-red-foreground',
    gray: 'text-black border-gray hover:bg-gray',
  }

  const sizeVariation = {
    fit: 'w-fit',
    full: 'w-full',
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center px-3 py-2 bg-transparent border ${colorVariants[color]} transition-colors text-base rounded ${sizeVariation[size]}`}
    >
      {Icon && (
        <span className="mr-2">
          <Icon size={16} />
        </span>
      )}
      {label}
    </button>
  )
}
