export const Input = ({ id, value, onChange, label, type, required, disabled = false, onEnter }) => {
  const handleEnter = (event) => {
    if (event.key === 'Enter' && onEnter) {
      onEnter()
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id}>{label}</label>
      <input
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        onKeyDown={handleEnter}
        required={required}
        disabled={disabled}
        className="rounded border border-gray focus:ring-secondary focus:border-secondary px-3 py-2 bg-white"
      />
    </div>
  )
}
