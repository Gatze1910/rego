import { useRouter } from 'next/router'

export const User = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <p>hallo vom index des users {id}</p>
    </>
  )
}

export default User
