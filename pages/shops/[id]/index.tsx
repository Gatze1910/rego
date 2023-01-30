import { useRouter } from 'next/router'

export const Shop = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <p>hallo vom index des shop {id}</p>
      <p></p>
    </>
  )
}

export default Shop
