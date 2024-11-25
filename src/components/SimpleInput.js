export const SimpleInput = ({ id, value, onEnter, placeholder, required }) => {
  return (
    <input
      name={id}
      placeholder={placeholder}
      type="text"
      value={value}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onEnter(e.target.value)
      }}
      required={required}
      style={{ borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}
      className="border-b border-gray focus:ring-0 focus:border-secondary p-1 mb-2 bg-white"
    />
  )
}
