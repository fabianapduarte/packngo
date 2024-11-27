import React, { useState, useEffect } from 'react'
import { LogIn } from 'react-feather'
import { useNavigate } from 'react-router-dom'

import img from '../../assets/passports.jpg'
import DATAF from '../../assets/data.json'
import { Button, Checkbox, HyperLink, Input, Logotype } from '../../components'
import { enumButtonColor } from '../../enums/enumButtonColor'

import './styles.css'

export default function Login() {
  const [data, setData] = useState([])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Get Data
    setData(DATAF[0].users)

    // Set Remember me values if exists
    const savedEmail = localStorage.getItem('email')
    const savedPassword = localStorage.getItem('password')
    if (savedEmail && savedPassword) {
      setEmail(savedEmail)
      setPassword(savedPassword)
      setRememberMe(true)
    }
  }, [])

  const handleLogin = (event) => {
    event.preventDefault()

    // Checks for existing user
    const user = data.find((user) => user.email === email.trim() && user.password === password.trim())
    if (user) {
      setMessage(`Bem-vindo, ${user.name}!`)

      // Saving remember me data
      if (rememberMe) {
        localStorage.setItem('email', email)
        localStorage.setItem('password', password)
      } else {
        localStorage.removeItem('email')
        localStorage.removeItem('password')
      }
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/home')
    } else {
      setMessage('Email ou senha incorretos!')
      setPassword('')
    }
  }
  return (
    <main className="flex justify-center lg:items-center min-h-screen p-8">
      <div className="lg:grid lg:grid-cols-2 h-fit form-container rounded shadow-lg bg-white">
        <img src={img} alt="Passaportes" className="rounded-t lg:rounded-tl lg:rounded-bl h-full object-cover" />
        <div className="py-6 px-8 flex flex-col items-center justify-center">
          <Logotype />
          <h2 className="font-semibold text-xl mt-2 mb-5">Login</h2>
          <form onSubmit={handleLogin} className="flex flex-col gap-3 w-full">
            <p className="text-wrap text-error">{message}</p>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              label="Email"
              type="email"
            />
            <Input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              label="Senha"
              type="password"
            />
            <div className="mb-2">
              <Checkbox
                name="remember-me"
                text="Lembrar de mim"
                isChecked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
            </div>
            <div className="self-center">
              <Button label="Login" color={enumButtonColor.primary} type="submit" Icon={LogIn} />
            </div>
          </form>
          <span className="mt-5">
            Não possui conta? <HyperLink text="Ir para cadastro" url="/cadastro" />
          </span>
        </div>
      </div>
    </main>
  )
}
