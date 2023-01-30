import useTranslation from 'next-translate/useTranslation'
import { Header } from '../components/partials/header';


export const Custom404 = () => {
  const { t } = useTranslation('basic')
  
  return (
    <>
    <h1>{t('error.404')}</h1>
    <Header></Header>
    <p>Test 1 </p>
    <p className="test">Test 2 </p>
    </>
  )
}

export default Custom404
