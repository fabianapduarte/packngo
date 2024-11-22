export const Participant = ({ imageSrc, name }) => {
  return (
    <div className="flex items-center">
      <img src={imageSrc} alt="Imagem do participante" className="rounded-full object-cover size-10 mr-3" />
      <div>{name}</div>
    </div>
  )
}
