import useTranslation from 'next-translate/useTranslation'
import Head from 'next/head'
import { ButtonPrimary, ButtonLink } from '../components/basic/button'
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
          <ButtonLink href="/shops/create">neuen Shop erstellen</ButtonLink>
        </div>
      </div>

      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>Das sind deine Shops</h1>

          <div className="uk-grid uk-child-width-1-2 uk-margin-remove" uk-grid>
            <div className="uk-padding uk-padding-remove-left uk-flex uk-flex-middle flex-gap-medium">
              <Image
                className="uk-width-1-3"
                src={insta}
                alt={'profile picture'}
              />
              <div>
                <h3>Shop Name</h3>
                <div className="uk-flex flex-gap">
                  <ButtonLink href="/shops/1">ansehen</ButtonLink>
                  <ButtonLink href="/shops/1/edit">bearbeiten</ButtonLink>
                </div>
              </div>
            </div>

            <div className="uk-padding uk-padding-remove-left uk-flex uk-flex-middle flex-gap-medium">
              <Image
                className="uk-width-1-3"
                src={insta}
                alt={'profile picture'}
              />
              <div>
                <h3>Shop Name</h3>
                <div className="uk-flex flex-gap">
                  <ButtonLink href="/shops/1">ansehen</ButtonLink>
                  <ButtonLink href="/shops/1/edit">bearbeiten</ButtonLink>
                </div>
              </div>
            </div>

            <div className="uk-padding uk-padding-remove-left uk-flex uk-flex-middle flex-gap-medium">
              <Image
                className="uk-width-1-3"
                src={insta}
                alt={'profile picture'}
              />
              <div>
                <h3>Shop Name</h3>
                <div className="uk-flex flex-gap">
                  <ButtonLink href="/shops/1">ansehen</ButtonLink>
                  <ButtonLink href="/shops/1/edit">bearbeiten</ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyShops
