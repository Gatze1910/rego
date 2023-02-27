import { useRouter } from 'next/router'
import Image from 'next/image'
import insta from '../../../assets/icons/instagram.png'
import { Product } from '../../../components/partials/product'
import { Categories } from '../../../components/partials/categories'
import { useUser } from '@auth0/nextjs-auth0/client'

export const EditShop = () => {
  const { user } = useUser()
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <p>hallo vom edit des shops {id}</p>
      <p>{user.sub}</p>
    </>
  )
}

export default EditShop
