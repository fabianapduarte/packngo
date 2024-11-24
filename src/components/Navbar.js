import { Menu, X } from 'react-feather'
import { Logotype } from './Logotype'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const NavbarLink = ({ text, url }) => {
  return (
    <Link to={url} className="font-semibold text-1xl mb-0 hover:text-primary transition-colors">
      {text}
    </Link>
  )
}

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const MenuIcon = isMenuOpen ? X : Menu

  const handleClickOnMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="px-10 md:px-20 lg:px-28 xl:px-40 py-6 bg-foreground border-b border-gray">
      <div className="flex justify-between items-center">
        <Logotype />
        <div className="hidden sm:flex gap-8">
          <NavbarLink text="Viagens" url="/home" />
          <NavbarLink text="Conta" url="/minha-conta" />
          <NavbarLink text="Sair" url="/" />
        </div>
        <MenuIcon className="flex sm:hidden cursor-pointer" size={24} color="#BCC1BA" onClick={handleClickOnMenu} />
      </div>

      <div
        className={
          isMenuOpen ? 'sm:hidden absolute left-0 bg-foreground w-full px-10 pb-6 border-b border-gray' : 'hidden'
        }
      >
        <div className="mt-8 flex flex-col gap-5">
          <NavbarLink text="Viagens" url="/home" />
          <NavbarLink text="Conta" url="/minha-conta" />
          <NavbarLink text="Sair" url="/" />
        </div>
      </div>
    </nav>
  )
}
