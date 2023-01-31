import { useRouter } from 'next/router'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'

interface LoginType {
  email: string
  password: string
}
const LoginPage = () => {
  const { logIn } = useAuth()
  const router = useRouter()

  const methods = useForm<LoginType>({ mode: 'onBlur' })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods

  const onSubmit = async (data: LoginType) => {
    try {
      await logIn(data.email, data.password)
      router.push('/shops/create')
    } catch (error: any) {
      console.log(error.message)
      console.log('maybe user is not registered - route user to register')
      router.push('users/register')
    }
  }

  return (
    <div>
      <h2>Log In</h2>
      <FormProvider {...methods}>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div>
              <label htmlFor="">Email</label>
            </div>

            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div>
            <div>
              <label htmlFor="">Password</label>
            </div>

            <input
              type="password"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>

          <div>
            <button type="submit">
              <p>submit</p>
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

export default LoginPage
