import { useRouter } from 'next/router'

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
