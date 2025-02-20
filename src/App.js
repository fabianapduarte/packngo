import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import { Travel } from './pages/Travel'
import Register from './pages/Register'
import Home from './pages/Home'
import Account from './pages/Account'
import { Schedule } from './pages/Schedule'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cadastro" element={<Register />} />
        <Route path="/viagem/:id" element={<Travel />} />
        <Route path="/viagem/:id/agenda" element={<Schedule />} />
        <Route path="/minha-conta" element={<Account />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
