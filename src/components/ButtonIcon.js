
export const ButtonIcon = ({color, Icon = null, onClick }) => {
  const colorVariants = {
    primary: 'bg-primary text-primary-foreground',
    red: 'bg-red text-red-foreground',
    transparent: 'bg-transparent text-black',
    transparentPrimary: 'bg-tranparent text-primary'
  }

  return (
    <button
      onClick={onClick}
      className={`flex items-center px-3 py-2 ${colorVariants[color]} hover:brightness-90 text-base rounded w-10 h-10`}
    >
      {Icon && (
        <span>
          <Icon size={16} />
        </span>
      )}
    </button>
  )
}
