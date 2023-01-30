import { useRouter } from 'next/router'

export const EditUser = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <p>hallo vom edit des users {id}</p>
    </>
  )
}

export default EditUser
