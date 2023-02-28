import useTranslation from 'next-translate/useTranslation'
import Head from 'next/head'
import { ButtonPrimary } from '../components/basic/button'
import Link from 'next/link'
import Image from 'next/image'
import insta from '../assets/icons/instagram.png'

export const MyShops = () => {
  const { t } = useTranslation('basic')

  return (
    <>
      <Head>
        <title>{t('title.short', { subtitle: t('nav.myShops') })}</title>
      </Head>
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>Das ist dein Profil</h1>
          <Link href="/shops/create">neuen Shop erstellen</Link>
        </div>
      </div>
      profil übersicht, mit shop erstellen button und einzelne shops falls
      vorhanden, edit and view profil übersicht, mit shop erstellen button und
      einzelne shops falls vorhanden, edit and view
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>Das sind deine Shops</h1>
          <div className="uk-grid uk-grid-large uk-child-width-1-2 uk-margin-remove">
            <div className="test-border">erster shop</div>
            <div className="test-border">zweiter shop</div>
            <div className="test-border">dritter shop</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyShops
