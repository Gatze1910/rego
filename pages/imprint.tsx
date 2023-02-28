import useTranslation from 'next-translate/useTranslation'
import Head from 'next/head'

export const Imprint = () => {
  const { t } = useTranslation('basic')

  return (
    <>
      <Head>
        <title>{t('title.short', { subtitle: t('nav.imprint') })}</title>
      </Head>
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>Hier wird das Impressum entstehen</h1>
        </div>
      </div>
    </>
  )
}

export default Imprint
