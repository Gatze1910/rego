import useTranslation from 'next-translate/useTranslation'
import Head from 'next/head'

export const Privacy = () => {
  const { t } = useTranslation('basic')

  return (
    <>
      <Head>
        <title>{t('title.short', { subtitle: t('nav.privacy') })}</title>
      </Head>
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>Hier wird die Datenschutzerklärung entstehen</h1>
        </div>
      </div>
    </>
  )
}

export default Privacy
