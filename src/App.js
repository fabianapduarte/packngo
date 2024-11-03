import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import { Travel } from './pages/Travel'

export default function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Login />} />
        <Route path="/viagem/:id" element={<Travel />} />
      </Route>
    </Routes>
  )
}
