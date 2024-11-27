export const TextArea = ({ id, onChange, label, value }) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id}>{label}</label>
      <textarea
        onChange={onChange}
        name={id}
        rows="3"
        className="rounded border border-gray focus:ring-secondary focus:border-secondary px-3 py-2 bg-white"
      >
        {value}
      </textarea>
    </div>
  )
}
