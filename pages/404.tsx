import useTranslation from 'next-translate/useTranslation'
import Head from 'next/head'
import { Header } from '../components/partials/header'
import { Footer } from '../components/partials/footer'

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
    </>
  )
}

export default Custom404
