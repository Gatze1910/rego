import { useRouter } from 'next/router'

export const CreateProduct = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <p>hallo vom create von products des shops {id}</p>
      <p>hier wird das form für ein neues product hinzufügen entstehen</p>
    </>
  )
}

export default CreateProduct
