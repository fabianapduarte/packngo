export const Button = ({ label, color, Icon = null, onClick, size = 'fit' }) => {
  const colorVariants = {
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    red: 'bg-red text-red-foreground',
    transparent: 'bg-transparent text-black',
    transparentPrimary: 'bg-tranparent text-primary',
  }

  const sizeVariation = {
    fit: 'w-fit',
    full: 'w-full',
  }

  return (
    <button
      onClick={onClick}
      className={`flex items-center px-3 py-2 ${colorVariants[color]} hover:brightness-90 text-base rounded ${sizeVariation[size]}`}
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
