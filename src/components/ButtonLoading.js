import { Loader } from 'react-feather'

export const ButtonLoading = ({ color, size = 'fit' }) => {
  const colorVariants = {
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    red: 'bg-red text-red-foreground',
    transparent: 'bg-transparent text-black',
    transparentPrimary: 'bg-tranparent text-primary',
  }

  const sizeVariation = {
    fit: 'w-fit',
    full: 'w-full',
  }

  return (
    <button
      disabled
      className={`flex items-center px-3 py-2 ${colorVariants[color]} hover:brightness-90 disabled:brightness-100 text-base rounded ${sizeVariation[size]}`}
    >
      <span className="mr-2">
        <Loader size={16} className="animate-spin" />
      </span>
      Carregando...
    </button>
  )
}
