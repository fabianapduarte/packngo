import { Link } from 'react-router-dom'

export const HyperLink = ({ text, url, icon = null }) => {
  return (
    <Link className="font-semibold text-1xl text-primary hover:text-secondary transition-colors" to={url}>
      {icon && <span className="mr-3">icon</span>}
      {text}
    </Link>
  )
}
