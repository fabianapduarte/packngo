import { getUserImage } from '../utils/getUserImage'

export const Participant = ({ imageSrc, name }) => {
  const image = getUserImage(imageSrc)

  return (
    <div className="flex items-center w-full">
      <img src={image} alt="Imagem do participante" className="rounded-full object-cover size-10 mr-3" />
      <div className="text-ellipsis whitespace-nowrap overflow-hidden">{name}</div>
    </div>
  )
}
