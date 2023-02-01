import useTranslation from 'next-translate/useTranslation'
import Head from 'next/head'
import { Header } from '../components/partials/header'
import { Footer } from '../components/partials/footer'
import { Product } from '../components/partials/product'

export const Custom404 = () => {
  const { t } = useTranslation('basic')

  return (
    <>
      <Head>
        <title>
          {t('title.short')} • {t('title.notFound')}
        </title>
      </Head>
      <h1>{t('error.404')}</h1>
      <h2>ein Überschrift 2</h2>
      <h3>eine Überschrift 3</h3>
      <Product />
    </>
  )
}

export default Custom404
