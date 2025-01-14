import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'react-feather'

import { AuthContext } from '../context/AuthContext'
import { Logotype } from './Logotype'
import { TextButton } from './TextButton'

const NavbarLink = ({ text, url }) => {
  return (
    <Link to={url} className="font-semibold text-1xl mb-0 hover:text-primary transition-colors">
      {text}
    </Link>
  )
}

const Links = ({ handleLogout }) => {
  return (
    <>
      <NavbarLink text="Viagens" url="/home" />
      <NavbarLink text="Conta" url="/minha-conta" />
      <TextButton label="Sair" color="black" onClick={handleLogout} />
    </>
  )
}

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const authContext = useContext(AuthContext)

  const MenuIcon = isMenuOpen ? X : Menu

  const handleClickOnMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = () => {
    authContext.logout()
  }

  return (
    <nav className="px-10 md:px-20 lg:px-28 xl:px-40 py-6 bg-foreground border-b border-gray">
      <div className="flex justify-between items-center">
        <Link to={'/home'}>
          <Logotype />
        </Link>

        <div className="hidden sm:flex gap-8">
          <Links handleLogout={handleLogout} />
        </div>
        <MenuIcon className="flex sm:hidden cursor-pointer" size={24} color="#BCC1BA" onClick={handleClickOnMenu} />
      </div>

      <div
        className={
          isMenuOpen ? 'sm:hidden absolute left-0 bg-foreground w-full px-10 pb-6 border-b border-gray' : 'hidden'
        }
      >
        <div className="mt-8 flex flex-col gap-5">
          <Links handleLogout={handleLogout} />
        </div>
      </div>
    </nav>
  )
}
