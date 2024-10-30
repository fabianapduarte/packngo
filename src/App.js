import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'

export default function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Login />} />
      </Route>
    </Routes>
  )
}
