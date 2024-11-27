export const Select = ({ id, label, children }) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id}>{label}</label>
      <select
        name={id}
        className="rounded border border-gray focus:ring-secondary focus:border-secondary px-3 py-2 bg-white"
      >
        {children}
      </select>
    </div>
  )
}
