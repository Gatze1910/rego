import { useRouter } from 'next/router'

export const EditPost = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <p>hallo vom edit des posts {id}</p>
    </>
  )
}

export default EditPost
