import { LogIn, Plus } from 'react-feather';
import { Navbar, Button } from '../../components'
import { TravelCard } from '../../components/TravelCard'
import { enumButtonColor } from '../../enums/enumButtonColor'

import './styles.css'


export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="bg-gray lg:items-center min-h-screen px-20 pt-5">
        <div className="flex items-center justify-between mb-7">
          <div className="font-bold text-2xl">Minhas viagens</div>
          <div className="flex space-x-4">
            <Button label="Entrar em viagem" color={enumButtonColor.primary} type="submit" Icon={LogIn} />
            <Button label="Criar viagem" color={enumButtonColor.primary} type="submit" Icon={Plus} />
          </div>
        </div>
        <TravelCard
          name="Minha Viagem de Teste"
          status="1"
          date="01/01/2025"
          location="Paris"
        />
      </div>
    </div>
  )
}
