export const ButtonIcon = ({ color, Icon = null, onClick, size = 16 }) => {
  const colorVariants = {
    primary: 'bg-primary text-primary-foreground',
    red: 'bg-red text-red-foreground',
    transparent: 'bg-transparent text-black',
    transparentPrimary: 'bg-tranparent text-primary',
  }

  return (
    <button
      onClick={onClick}
      className={`flex items-center p-3 ${colorVariants[color]} hover:brightness-90 text-base rounded w-${size} h-${size}`}
    >
      {Icon && (
        <span>
          <Icon size={size} />
        </span>
      )}
    </button>
  )
}
