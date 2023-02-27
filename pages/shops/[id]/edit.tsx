import { useRouter } from 'next/router'
import Image from 'next/image'
import insta from '../../../assets/icons/instagram.png'
import { Product } from '../../../components/partials/product'
import { Categories } from '../../../components/partials/categories'

export const EditShop = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <p>hallo vom edit des shops {id}</p>
    </>
  )
}

export default EditShop
