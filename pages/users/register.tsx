import useTranslation from 'next-translate/useTranslation'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Input, Submit } from '../../components/basic/formfields'
import { useAuth } from '../../context/AuthContext'

export interface RegisterFields {
  email: string
  password: string
  password_confirm: string
}

const RegisterPage = () => {
  const tF = useTranslation('form').t
  const tB = useTranslation('basic').t

  const { signUp } = useAuth()
  const router = useRouter()

  const methods = useForm<RegisterFields>({ mode: 'onChange' })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods

  const onSubmit = async (data: RegisterFields) => {
    try {
      await signUp(data.email, data.password)
      router.push('/login')
    } catch (error: any) {
      console.log(error.message)
    }
  }

  return (
    <>
      <Head>
        <title>{tB('title.short', { subtitle: tB('title.register') })}</title>
      </Head>
      <h1>{tB('title.register')}</h1>

      <FormProvider {...methods}>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <Input
            id="email"
            type="email"
            placeholder="mail@provider.com"
            icon="mail"
            flipicon
            label="E-Mail"
            validation={{
              field: 'email',
              register,
              error: errors.email,
              option: {
                required: tF('error.required'),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: tF('error.pattern'),
                },
              },
            }}
          />

          <Input
            id="password"
            type="password"
            icon="lock"
            flipicon
            label="Passwort"
            validation={{
              field: 'password',
              register,
              error: errors.password,
              option: {
                required: tF('error.required'),
                minLength: {
                  value: 6,
                  message: tF('error.minLength', { count: 6 }),
                },
              },
            }}
          />

          <Input
            id="password_confirm"
            type="password"
            icon="lock"
            flipicon
            label="Passwort bestätigen"
            validation={{
              field: 'password_confirm',
              register,
              error: errors.password_confirm,
              option: {
                required: tF('error.required'),
                minLength: {
                  value: 6,
                  message: tF('error.minLength', { count: 6 }),
                },
              },
            }}
          />

          <Submit id="register" value={tB('title.register')} />
        </form>
      </FormProvider>
    </>
  )
}

export default RegisterPage
