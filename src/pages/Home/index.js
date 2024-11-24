import { LogIn } from 'react-feather'
import { Plus } from 'react-feather'
import { Navbar } from '../../components/Navbar'
import { Card } from '../../components/Card'
import { TravelStatus } from '../../components/TravelStatus'
import { Button } from '../../components/Button'
import './styles.css'

export default function Home() {
  return (
    <div>
      <Navbar />
      <Card>
        <div className="container-fluid mx-5">
          <div className="col-md-4">
            <div className="container-fluid">
              <div className="col-md-7">
                <h1>Minhas Viagens</h1>
              </div>
              <div className="col-md-5">
                <div className="col-md-3">
                  <Button label="Entrar em viagem" icon={<LogIn size={16} />} />
                </div>
                <div className="col-md-2">
                  <Button label="Criar viagem" icon={<Plus size={16} />} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <h1>Viagem de fim de ano</h1>
            <TravelStatus></TravelStatus>
            <p>Local</p>
            <p>Data</p>
          </div>
        </div>
      </Card>
    </div>
  )
}