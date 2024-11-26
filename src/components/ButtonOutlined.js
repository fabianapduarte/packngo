export const ButtonOutlined = ({ label, color, Icon = null, onClick }) => {
  const colorVariants = {
    primary: 'text-primary border-primary hover:bg-primary hover:text-primary-foreground',
    red: 'text-red border-red hover:bg-red hover:text-red-foreground',
  }

  return (
    <button
      onClick={onClick}
      className={`flex items-center px-3 py-2 bg-transparent border ${colorVariants[color]} transition-colors text-base rounded w-fit`}
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
