import { HyperLink, Logotype } from '../../components'

import './styles.css'

export default function NotFound() {
  return (
    <main className="flex justify-center lg:items-center min-h-screen p-8">
      <div className="content-container rounded shadow-lg bg-not-found bg-cover bg-top flex flex-col items-center p-8">
        <Logotype />
        <h2 className="text-4xl text-center font-semibold mt-6 mb-2">Página não encontrada</h2>
        <HyperLink text="Ir para login" url="/" />
      </div>
    </main>
  )
}
