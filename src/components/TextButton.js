export const TextButton = ({ label, Icon = null }) => {
  return (
    <button className="flex items-center text-primary hover:text-secondary transition-colors font-semibold w-fit">
      {Icon && (
        <span className="mr-1">
          <Icon size={16} />
        </span>
      )}
      {label}
    </button>
  )
}
