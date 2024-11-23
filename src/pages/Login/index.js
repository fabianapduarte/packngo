import { LogIn } from 'react-feather'
import img from '../../assets/passports.jpg'
import { Logotype } from '../../components/Logotype'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { HyperLink } from '../../components/HyperLink'
import DATAF from '../../assets/data.json'
import './styles.css'
import React, { useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

export default function Login() {
  const [data, setData] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(false);


  useEffect(() => {
    // Get Data
    setData(DATAF[0].users);

    // Set Remember me values if exists
    const savedEmail = localStorage.getItem('email');
    const savedPassword = localStorage.getItem('password');
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();

    // Checks for existing user    
    const user = data.find(user => user.email === email.trim() && user.password === password.trim());
    if (user) {
      setMessage(`Bem-vindo, ${user.name}!`);

      // Saving remember me data  
      if (rememberMe) {
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
      }
      else {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
      }
      //Navigate("/viagem");  
    }
    else {
      setMessage('Email ou senha incorretos!');
      setPassword('');
    }
  };
  return (
    <main className="flex justify-center lg:items-center min-h-screen p-8">
      <div className="lg:grid lg:grid-cols-2 h-fit form-container rounded shadow-lg bg-white">
        <img src={img} alt="Passaportes" className="rounded-t lg:rounded-tl lg:rounded-bl h-full object-cover" />
        <div className="p-8 flex flex-col items-center">
          <Logotype />
          <h2 className="font-semibold text-xl mt-2 mb-5">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-3 w-full mb-4">
              <p className='text-wrap text-error'>{message}</p>
              <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} required label="Email" type="email" />
              <Input id="password" value={password} onChange={(e) => setPassword(e.target.value)} required label="Senha" type="password" />
            </div>
            <div className="mb-4">
              <label>
                <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} /> Lembrar de mim
              </label>
            </div>
            <Button label="Login" color="primary" type="submit" icon={<LogIn size={16} />} />
          </form>
          <span className="mt-5">
            Não possui conta? <HyperLink text="Ir para registrar" url="/cadastro" />
          </span>
        </div>
      </div>
    </main>
  )
}
