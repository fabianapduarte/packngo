export const Participant = ({ imageSrc, name }) => {
  return (
    <div className="flex items-center w-full">
      <img src={imageSrc} alt="Imagem do participante" className="rounded-full object-cover size-10 mr-3" />
      <div className="text-ellipsis whitespace-nowrap overflow-hidden">{name}</div>
    </div>
  )
}
