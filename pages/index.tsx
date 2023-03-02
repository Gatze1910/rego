import useTranslation from 'next-translate/useTranslation'
import Head from 'next/head'
import { Categories } from '../components/partials/categories'

export const Home = () => {
  const { t } = useTranslation()

  return (
    <>
      <Head>
        <title>{t('basic:title.long')}</title>
        <meta
          name="description"
          content="MMP3 - FH Salzburg - REGO - Bernadette Ackerl, Vanessa Reiter und Markus Rinnerberger"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="uk-section">
          <div className="uk-container uk-container-small">
            <h1 className="uk-text-center">{t('landingPage:heading.title')}</h1>

            <div className="uk-text-center">
              <p>
                {t('landingPage:text.title')}
              </p>
            </div>
          </div>
        </div>

        <div className="uk-section">
          <div className="uk-container uk-container-large">
            <h2>{t('landingPage:heading.category')}</h2>
            <p className="uk-margin-medium-bottom">{t('landingPage:text.category')}</p>
            <Categories />
          </div>
        </div>

        <div className="uk-section">
          <div className="background-orange">
            <div className="uk-section">
              <div className="uk-container uk-container-small">
                <h2>{t('landingPage:heading.concept')}</h2>
                <p>{t('landingPage:text.concept')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="uk-section">
          <div className="uk-container uk-container-small">
            <h2>{t('landingPage:heading.team')}</h2>
            <p>{t('landingPage:text.team')}</p>
          </div>
        </div>

      </main>
    </>
  )
}

export default Home
