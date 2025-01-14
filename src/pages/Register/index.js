import React, { useContext, useState } from 'react'
import { UserPlus } from 'react-feather'
import { useSnackbar } from 'notistack'

import img from '../../assets/passports.jpg'
import { Button, ButtonLoading, HyperLink, Input, Logotype } from '../../components'
import { AuthContext } from '../../context/AuthContext'
import { enumButtonColor } from '../../enums/enumButtonColor'

import './styles.css'
import { loginRoute } from '../../utils/routes'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const { enqueueSnackbar } = useSnackbar()
  const authContext = useContext(AuthContext)

  const handleRegister = () => {
    if (name.length === 0 || email.length === 0 || password.length === 0 || passwordConfirmation.length === 0) {
      enqueueSnackbar('Preencha todos os campos.', { variant: 'warning' })
    } else if (name.length < 2) {
      enqueueSnackbar('O nome precisa ter mais de dois caracteres.', { variant: 'warning' })
    } else if (password.length < 8) {
      enqueueSnackbar('A senha precisa ter no mínimo 8 caracteres.', { variant: 'warning' })
    } else if (password !== passwordConfirmation) {
      enqueueSnackbar('A senha e a confirmação de senha não coincidem.', { variant: 'warning' })
    } else {
      authContext.register({ name, email, password, passwordConfirmation })
    }
  }

  return (
    <main className="flex justify-center lg:items-center min-h-screen p-8">
      <div className="lg:grid lg:grid-cols-2 h-fit register-container rounded shadow-lg bg-white">
        <img src={img} alt="Passaportes" className="rounded-t lg:rounded-tl lg:rounded-bl h-full object-cover" />
        <div className="py-6 px-8 flex flex-col items-center">
          <Logotype />
          <h2 className="font-semibold text-xl mt-2 mb-5">Cadastro</h2>
          <div className="flex flex-col gap-3 w-full mb-4">
            <Input
              id="name"
              label="Nome"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              onEnter={handleRegister}
            />
            <Input
              id="email"
              label="Email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onEnter={handleRegister}
            />
            <Input
              id="password"
              label="Senha"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onEnter={handleRegister}
            />
            <Input
              id="password_confirmation"
              label="Confirmar senha"
              type="password"
              required
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              onEnter={handleRegister}
            />
          </div>
          {authContext.loading && <ButtonLoading color={enumButtonColor.primary} />}
          {!authContext.loading && (
            <Button label="Cadastrar" color={enumButtonColor.primary} Icon={UserPlus} onClick={handleRegister} />
          )}
          <span className="mt-5">
            Já possui conta? <HyperLink text="Ir para login" url={loginRoute} />
          </span>
        </div>
      </div>
    </main>
  )
}
