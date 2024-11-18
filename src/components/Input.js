export const Input = ({ label, id, type }) => {
  return (
    <div className="flex flex-col gap-1">
      <label for={id}>{label}</label>
      <input name={id} type={type} className="rounded border border-gray focus:border-secondary px-3 py-2 bg-white" />
    </div>
  )
}
