export const ButtonOutlined = ({ label, color, icon = null }) => {
  const colorVariants = {
    primary: 'text-primary border-primary hover:bg-primary hover:text-primary-foreground',
    red: 'text-red border-red hover:bg-red hover:text-red-foreground',
  }

  return (
    <button
      className={`flex items-center px-3 py-2 bg-transparent border ${colorVariants[color]} transition-colors text-base rounded`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </button>
  )
}
