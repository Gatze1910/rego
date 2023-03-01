import useTranslation from 'next-translate/useTranslation'
import Head from 'next/head'
import { ButtonPrimary, ButtonSecondary } from '../components/basic/button'

export const Home = () => {
  const { t } = useTranslation('basic')

  return (
    <>
      <Head>
        <title>{t('title.long')}</title>
        <meta
          name="description"
          content="MMP3 - FH Salzburg - REGO - Bernadette Ackerl, Vanessa Reiter und Markus Rinnerberger"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="uk-section">
          <div className="uk-container uk-container-large">
            <h1 className="uk-text-center">ReGo - Regional to go</h1>

            <div className="uk-text-center">
              <h2>Das ist ReGo</h2>
              <p>
                Mit ReGo soll regionales und nachhaltiges Einkaufen
                (wieder)entdeckt werden. Jeder, der gerne seine Produkte
                verkaufen möchte, egal ob Obst-Stand oder Hofladen, hat hier die
                Möglichkeit sein Profil zu erstellen, sodass man zeigen kann
                „hey mich gibt’s auch“. Die potenziellen Käufer können Shops in
                ihrer Region entdecken und über Routen den geplanten
                Nachmittagsspaziergang mit einem regionalen Einkauf verbinden.
              </p>
            </div>
          </div>
        </div>

        <div>
          <p>wir sind gerade beim Entwicklen von</p>
          <h1>ReGo - Regional to go</h1>
          <p>besuche uns bald wieder</p>
        </div>
     
      </main>
    </>
  )
}

export default Home
