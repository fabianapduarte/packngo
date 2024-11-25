export const TextButton = ({ label, Icon = null, onClick = () => {} }) => {
  return (
    <button
      className="flex items-center text-primary hover:text-secondary transition-colors font-semibold w-fit"
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
