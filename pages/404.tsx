import useTranslation from 'next-translate/useTranslation'
import { Head } from 'next/document';
import { Header } from '../components/partials/header';


export const Custom404 = () => {
  const { t } = useTranslation('basic')

  return (
    <>
      <h1>{t('error.404')}</h1>
      <Header></Header>

    </>
  )
}

export default Custom404
