import useTranslation from 'next-translate/useTranslation'
import Head from 'next/head'
import { Card } from '../components/partials/post'

export const Custom404 = () => {
  const { t } = useTranslation('basic')

  return (
    <>
      <Head>
        <title>{t('title.short', { subtitle: t('title.404') })}</title>
      </Head>

      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>{t('title.404')}</h1>
        </div>
      </div>

      {/* <div className="uk-section">
        <div className="uk-container uk-container-large">
          <div className="uk-flex uk-flex-center">
            <div className="uk-grid uk-grid-large uk-width-1-1 uk-child-width-1-3 uk-grid-row-large">
              <Card />
              <Card />
              <Card />
            </div>
          </div>
        </div>
      </div> */}
    </>
  )
}

export default Custom404
