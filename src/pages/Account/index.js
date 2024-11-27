import React, { useState, useEffect } from 'react'
import { Save, Edit2 } from 'react-feather'
import { Button, Card, Input, Layout } from '../../components'
import { useSnackbar } from 'notistack'
import './styles.css'

import profilePic from '../../assets/profilePic.png'

export default function Account() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [user, setUser] = useState(null)
  const [image, setImage] = useState(profilePic)

  const { enqueueSnackbar } = useSnackbar()
  const handleSaveData = () => {
    enqueueSnackbar('Informações salvas com sucesso!', { variant: 'success' })
  }

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'))
    setUser(storedUser)
  }, [])

  useEffect(() => {
    if (user) {
      setName(user.name || '')
      setEmail(user.email || '')
      setPassword(user.password || '')
      setPasswordConfirm(user.password || '')
    }
  }, [user])

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Layout>
      <div className="flex flex-col gap-6 overflow-hidden w-full md:w-3/5 lg:w-5/12 mx-auto pb-12">
        <Card>
          <div className="min-full h-full mb-4">
            <h3 className="font-bold text-xl text-center">Minha conta</h3>

            <div className="relative overflow-hidden object-cover w-5/6 md:w-2/6 rounded col-span-1 mx-auto my-4">
              <div className="w-full rounded overflow-hidden">
                <img src={image} alt={'Profile'} className="profile-picture w-full aspect-square object-cover" />
              </div>
              <div className="flex justify-center -translate-y-1/2">
                <label
                  htmlFor="imageInput"
                  className="flex items-center cursor-pointer text-white bg-primary hover:brightness-90 rounded p-3 w-fit"
                >
                  <Edit2 size={16} />
                </label>
                <input id="imageInput" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </div>
            </div>

            <div className="sm:w-3/4 w-full mx-auto">
              <div className="mb-4">
                <Input
                  value={name}
                  id="name"
                  label="Nome"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4 opacity-50">
                <Input value={email} id="email" label="E-mail" type="email" disabled="disabled" required />
              </div>
              <div className="mb-4">
                <Input
                  value={password}
                  id="password"
                  label="Senha"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <Input
                  value={passwordConfirm}
                  id="passwordConfirm"
                  label="Confirmar Senha"
                  type="password"
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-center">
                <Button label={'Salvar'} color={'primary'} Icon={Save} onClick={handleSaveData} />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  )
}
