import { useRouter } from 'next/router'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useAuth } from '../../context/AuthContext'

interface RegisterType {
  email: string
  password: string
  password_confirm: string
}

const RegisterPage = () => {
  const { signUp } = useAuth()
  const router = useRouter()

  const methods = useForm<RegisterType>({ mode: 'onBlur' })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods

  const onSubmit = async (data: RegisterType) => {
    try {
      await signUp(data.email, data.password)
      router.push('/login')
    } catch (error: any) {
      console.log(error.message)
    }
  }

  return (
    <div>
      <h2>Sign Up</h2>
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
            <div>
              <label htmlFor="">Confirm Password</label>
            </div>
            <input
              type="password"
              {...register('password_confirm', {
                required: 'Verify your password',
              })}
            />
            {errors.password_confirm && (
              <p>{errors.password_confirm.message}</p>
            )}
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

export default RegisterPage
