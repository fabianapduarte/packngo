import { UserPlus } from 'react-feather'
import img from '../../assets/passports.jpg'
import { Button, HyperLink, Input, Logotype } from '../../components'
import { enumButtonColor } from '../../enums/enumButtonColor'

import './styles.css'

export default function Register() {
  return (
    <main className="flex justify-center lg:items-center min-h-screen p-8">
      <div className="lg:grid lg:grid-cols-2 h-fit register-container rounded shadow-lg bg-white">
        <img src={img} alt="Passaportes" className="rounded-t lg:rounded-tl lg:rounded-bl h-full object-cover" />
        <div className="py-6 px-8 flex flex-col items-center">
          <Logotype />
          <h2 className="font-semibold text-xl mt-2 mb-5">Cadastro</h2>
          <div className="flex flex-col gap-3 w-full mb-4">
            <Input id="name" label="Nome" type="text" />
            <Input id="email" label="Email" type="email" />
            <Input id="password" label="Senha" type="password" />
            <Input id="confirm-password" label="Confirmar senha" type="password" />
          </div>
          <Button label="Cadastrar" color={enumButtonColor.primary} Icon={UserPlus} />
          <span className="mt-5">
            Já possui conta? <HyperLink text="Ir para login" url="/" />
          </span>
        </div>
      </div>
    </main>
  )
}
