export const TextButton = ({ label, Icon = null, color = 'primary', onClick = () => {} }) => {
  const colorVariants = {
    primary: 'text-primary hover:text-secondary',
    black: 'text-black hover:text-primary',
  }

  return (
    <button
      className={`flex items-center ${colorVariants[color]} transition-colors font-semibold w-fit`}
      onClick={onClick}
    >
      {Icon && (
        <span className="mr-1">
          <Icon size={16} />
        </span>
      )}
      {label}
    </button>
  )
}
