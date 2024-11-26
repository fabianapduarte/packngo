export const Button = ({ label, color, Icon = null, onClick }) => {
  const colorVariants = {
    primary: 'bg-primary text-primary-foreground',
    red: 'bg-red text-red-foreground',
    transparent: 'bg-transparent text-black',
    transparentPrimary: 'bg-tranparent text-primary'
  }

  return (
    <button
      onClick={onClick}
      className={`flex items-center px-3 py-2 ${colorVariants[color]} hover:brightness-90 text-base rounded w-fit`}
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
