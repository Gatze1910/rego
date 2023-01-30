import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

export const Shop = () => {
  const router = useRouter()
  const { id } = router.query
  const { t } = useTranslation('common')

  return (
    <>
      <p>hallo vom index des shop {id}</p>
      <p>{t('title')}</p>

      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </>
  )
}

export default Shop
