import { useState } from 'react'

export const Checkbox = ({ name, text, isChecked, onChange }) => {
  const [checkedValue, setCheckedValue] = useState(isChecked)

  const handleCheck = (e) => {
    if (onChange) onChange(e)
    setCheckedValue(!checkedValue)
  }

  return (
    <div className="flex gap-2 items-center">
      <input
        type="checkbox"
        className="size-4 rounded-sm border border-gray text-primary focus:ring-primary cursor-pointer"
        name={name}
        checked={checkedValue}
        onChange={handleCheck}
      />
      <label htmlFor={name}>{text}</label>
    </div>
  )
}
