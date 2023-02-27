import useTranslation from 'next-translate/useTranslation'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Input, Submit } from '../components/basic/formfields'
import { useAuth } from '../context/AuthContext'

export interface LoginFields {
  email: string
  password: string
}

const LoginPage = () => {

  const tF = useTranslation('form').t
  const tB = useTranslation('basic').t

  const { logIn } = useAuth()
  const router = useRouter()

  const methods = useForm<LoginFields>({ mode: 'onChange' })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods

  const onSubmit = async (data: LoginFields) => {
    try {
      await logIn(data.email, data.password)
      router.push('/shops/create')
    } catch (error: any) {
      console.log(error.message)
      console.log('maybe user is not registered - route user to register')
      router.push('users/register')
    }
  }

  return (<>
    <Head>
      <title>
        {tB('title.short', { subtitle: tB('title.login') })}</title>
    </Head>
    <h1>{tB('title.login')}</h1>
    <FormProvider {...methods}>
      <form className="uk-margin-medium-top" action="" onSubmit={handleSubmit(onSubmit)}>

        <Input
          id="email"
          type="email"
          placeholder="mail@provider.com"
          icon="mail" flipicon
          label="E-Mail"
          validation={{
            field: 'email',
            register,
            error: errors.email,
            option: { required: tF('error.required'), pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: tF('error.pattern') } }
          }}
        />

        <Input
          id="password"
          type="password"
          icon="lock" flipicon
          label="Passwort"
          validation={{
            field: 'password',
            register,
            error: errors.password,
            option: { required: tF('error.required'), minLength: { value: 6, message: tF('error.minLength', { count: 6 }) } }
          }}
        />

        <Submit id="login" value="Login" />
      </form>
    </FormProvider>
  </>
  )
}

export default LoginPage
