import React, { useState, useEffect, useContext } from 'react'
import { Save, Edit2, Loader } from 'react-feather'
import { useSnackbar } from 'notistack'

import profilePic from '../../assets/profile.png'
import { Button, ButtonLoading, Card, Input, Layout, Loading } from '../../components'
import { AuthContext, UserContext } from '../../context/AuthContext'
import { enumButtonColor } from '../../enums/enumButtonColor'
import { storageUrl } from '../../utils/routesApi'
import { getUserImage } from '../../utils/getUserImage'

import './styles.css'

export default function Account() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [image, setImage] = useState(profilePic)
  const [loadingImage, setLoadingImage] = useState(false)

  const { enqueueSnackbar } = useSnackbar()
  const { user } = useContext(UserContext)
  const { loading, updateUser, updateUserImage } = useContext(AuthContext)

  const handleSaveData = async () => {
    if (name.length === 0) {
      enqueueSnackbar('Preencha os campos.', { variant: 'warning' })
    } else if (name.length < 2) {
      enqueueSnackbar('O nome precisa ter mais de dois caracteres.', { variant: 'warning' })
    } else if (password.length < 8 && password.length !== 0) {
      enqueueSnackbar('A senha precisa ter no mínimo 8 caracteres.', { variant: 'warning' })
    } else if (password !== passwordConfirmation) {
      enqueueSnackbar('A senha e a confirmação de senha não coincidem.', { variant: 'warning' })
    } else {
      await updateUser({ name, password, passwordConfirmation })
      setPassword('')
      setPasswordConfirmation('')
    }
  }

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setImage(getUserImage(user.image_path))
    }
  }, [user])

  const onSuccess = (filename) => {
    setImage(storageUrl + filename)
    setLoadingImage(false)
  }

  const onError = () => {
    setLoadingImage(false)
  }

  const onLoading = () => {
    setLoadingImage(true)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) updateUserImage({ file, onLoading, onSuccess, onError })
  }

  if (user) {
    return (
      <Layout>
        <div className="flex flex-col gap-6 overflow-hidden w-full md:w-3/5 lg:w-5/12 mx-auto">
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
                    {loadingImage ? <Loader size={16} className="animate-spin" /> : <Edit2 size={16} />}
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
                    label="Nova senha"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <Input
                    value={passwordConfirmation}
                    id="passwordConfirm"
                    label="Confirmar nova senha"
                    type="password"
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    required
                  />
                </div>
                <div className="flex justify-center">
                  {loading && <ButtonLoading color={enumButtonColor.primary} />}
                  {!loading && (
                    <Button label="Salvar" color={enumButtonColor.primary} Icon={Save} onClick={handleSaveData} />
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Layout>
    )
  } else {
    return (
      <Layout>
        <Loading />
      </Layout>
    )
  }
}
