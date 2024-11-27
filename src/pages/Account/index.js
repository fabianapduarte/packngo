import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { List, LogIn, Plus } from 'react-feather';
import { Button, ButtonIcon, Card, Input, Layout } from '../../components';
import { TravelCard } from '../../components/TravelCard';
import { enumButtonColor } from '../../enums/enumButtonColor';
import { enumTravelStatus } from '../../enums/enumTravelStatus';
import DATAF from '../../assets/data.json';
import './styles.css';

import profilePic from '../../assets/profilePic.png';
import { Save, Edit2 } from 'react-feather';

export default function Account() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser); 
  }, []);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPassword(user.password || '');
      setPasswordConfirm(user.password || '');
    }
  }, [user]);

  return (
    <Layout>
      <div className="flex flex-col gap-6 overflow-hidden w-full md:w-2/3 lg:w-5/12 mx-auto pb-12">
        <Card>
          <div className="min-full h-full mb-4">
            <h3 className="font-bold text-xl text-center">Minha conta</h3>

            <div className="relative overflow-hidden object-cover w-5/6 md:w-2/6 rounded col-span-1 mx-auto my-4">
              <img src={profilePic} alt={"Profile picture"} className="w-full h-full object-cover" />
              <div className='flex justify-center -translate-y-1/2'>
                <ButtonIcon
                  color={"primary"}
                  Icon={Edit2}
                />
              </div>
            </div>

            <div className='sm:w-3/4 w-full mx-auto'>
              <div className='mb-4'>
                <Input
                  value={name}
                  id="name"
                  label="Nome"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className='mb-4 opacity-50'>
                <Input
                  value={email}
                  id="email"
                  label="E-mail"
                  type="email"
                  disabled="disabled"
                  required
                />
              </div>
              <div className='mb-4'>
                <Input
                  value={password}
                  id="password"
                  label="Senha"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className='mb-4'>
                <Input
                  value={passwordConfirm}
                  id="passwordConfirm"
                  label="Confirmar Senha"
                  type="password"
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  required
                />
              </div>
              <div className='flex justify-center'>
                <Button
                  label={"Salvar"}
                  color={"primary"}
                  Icon={Save}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
