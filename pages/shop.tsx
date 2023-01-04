import React from 'react'
import { useForm } from 'react-hook-form'
import { gql, useMutation } from '@apollo/client'
import prisma from '../lib/prisma'

const CreateShopMutation = gql`
  mutation($name: String!, $street: String!, $postcode: Int!, $ownerId: Int!, $owner: User!) {
    createShop(name: $name, street: $street, postcode: $postcode, ownerId: $ownerId, owner: $owner) {
      name
      street
      postcode
      ownerId
      owner
    }
  }
`

const owner = gql`
  query($user: User!) {
    user {
        id
    }  
}
`

const Shop = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const [createShop, { loading, error }] = useMutation(CreateShopMutation, {
    onCompleted: () => reset()
  })

  const onSubmit = async data => {
    
    const { name, street, postcode, ownerId } = data
    const variables = { name, street, postcode, ownerId, owner }
    try {
      createShop({ variables })

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <h1>Create a new Shop</h1>
      <form className="grid grid-cols-1 gap-y-6 shadow-lg p-8 rounded-lg" onSubmit={handleSubmit(onSubmit)}>
       
        <label className="block">
          <span className="text-gray-700">name</span>
          <input
            placeholder="name"
            name="name"
            type="text"
            {...register('name', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Street</span>
          <input
            placeholder="Streetname"
            {...register('street', { required: true })}
            name="street"
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Postcode</span>
          <input
            placeholder="1234"
            {...register('postcode', { valueAsNumber: true, required: true })}
            name="postcode"
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>

        <input
            placeholder="1"
            {...register('ownerId', { valueAsNumber: true, required: true })}
            name="ownerId"
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />

        <button
          disabled={loading}
          type="submit"
          className="my-4 capitalize bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg
                className="w-6 h-6 animate-spin mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
              </svg>
              Creating...
            </span>
          ) : (
            <span>Create Shop</span>
          )}
        </button>
      </form>
    </div>
  )
}

export default Shop

export const getServerSideProps = async ({ req, res }) => {
  /*const session = getSession(req, res)

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/api/auth/login',
      },
      props: {},
    }
  }*/

  return {
    props: {},
  }
}
