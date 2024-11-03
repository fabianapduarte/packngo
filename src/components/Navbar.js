import { Menu } from 'react-feather'
import { Logotype } from './Logotype'

const Link = ({ text, url }) => {
  return (
    <a href={url} className="font-semibold text-1xl mb-0 hover:text-primary transition-colors">
      {text}
    </a>
  )
}

export const Navbar = () => {
  return (
    <header className="flex justify-between items-center px-10 md:px-40 py-6 bg-foreground border-b border-gray">
      <Logotype />
      <nav className="hidden md:flex gap-8">
        <Link text="Viagens" url="#" />
        <Link text="Conta" url="#" />
        <Link text="Sair" url="#" />
      </nav>
      <Menu className="flex md:hidden cursor-pointer" size={24} color="#BCC1BA" />
    </header>
  )
}
