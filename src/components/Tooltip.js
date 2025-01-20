export const Tooltip = ({ element, text }) => {
  return (
    <div className="group relative w-fit">
      {element}
      <div className="invisible group-hover:visible bg-background border border-gray w-max p-2 rounded absolute z-1 left-0">
        {text}
      </div>
    </div>
  )
}
