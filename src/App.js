import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import { Travel } from './pages/Travel'
import Register from './pages/Register'
import Home from './pages/Home'


export default function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Login />} />
        <Route path="/viagem" element={<Home />} />
        <Route path="/cadastro" element={<Register />} />
        <Route path="/viagem/:id" element={<Travel />} />
      </Route>
    </Routes>
  )
}
