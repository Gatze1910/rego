import { useRouter } from 'next/router'

export const EditProduct = () => {
  const router = useRouter()
  const { pid } = router.query

  return (
    <>
      <p>hallo vom edit von product {pid}</p>
    </>
  )
}

export default EditProduct
