import useTranslation from 'next-translate/useTranslation'
import { Head } from 'next/document';
import { Header } from '../components/partials/header';
import { Footer } from '../components/partials/footer';


export const Custom404 = () => {
  const { t } = useTranslation('basic')

  return (
    <>
      <Header></Header>
      <h1>{t('error.404')}</h1>
      <Footer></Footer>
    </>
  )
}

export default Custom404
