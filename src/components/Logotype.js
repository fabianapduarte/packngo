import { Link } from 'react-router-dom'
export const Logotype = () => {
  return <Link className="font-semibold text-1xl text-primary hover:text-secondary transition-colors" to={"/home"}>
    <h1 className="text-3xl font-extrabold text-primary">Pack&Go</h1>
  </Link>
}
