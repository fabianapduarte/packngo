import React, { useState, useContext } from 'react'
import { LogIn } from 'react-feather'
import { useSnackbar } from 'notistack'

import img from '../../assets/passports.jpg'
import { Button, ButtonLoading, HyperLink, Input, Logotype } from '../../components'
import { AuthContext } from '../../context/AuthContext'
import { enumButtonColor } from '../../enums/enumButtonColor'

import './styles.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const authContext = useContext(AuthContext)
  const { enqueueSnackbar } = useSnackbar()

  const handleLogin = () => {
    if (email.length === 0 || password.length === 0) {
      enqueueSnackbar('Preencha todos os campos', { variant: 'warning' })
    } else {
      authContext.login({ email, password })
    }
  }

  return (
    <main className="flex justify-center lg:items-center min-h-screen p-8">
      <div className="lg:grid lg:grid-cols-2 h-fit form-container rounded shadow-lg bg-white">
        <img src={img} alt="Passaportes" className="rounded-t lg:rounded-tl lg:rounded-bl h-full object-cover" />
        <div className="py-6 px-8 flex flex-col items-center justify-center">
          <Logotype />
          <h2 className="font-semibold text-xl mt-2 mb-5">Login</h2>
          <div className="flex flex-col gap-3 w-full">
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onEnter={handleLogin}
              required
              label="Email"
              type="email"
            />
            <Input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onEnter={handleLogin}
              required
              label="Senha"
              type="password"
            />
            <div className="self-center mt-2">
              {authContext.loading && <ButtonLoading color={enumButtonColor.primary} />}
              {!authContext.loading && (
                <Button label="Login" color={enumButtonColor.primary} Icon={LogIn} onClick={handleLogin} />
              )}
            </div>
          </div>
          <span className="mt-5">
            Não possui conta? <HyperLink text="Ir para cadastro" url="/cadastro" />
          </span>
        </div>
      </div>
    </main>
  )
}
