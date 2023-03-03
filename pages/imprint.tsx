import useTranslation from 'next-translate/useTranslation'
import Head from 'next/head'

export const Imprint = () => {
  const { t } = useTranslation()

  return (
    <>
      <Head>
        <title>{t('basic:title.short', { subtitle: t('basic:nav.imprint') })}</title>
      </Head>
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>{t('text:heading.imprint')}</h1>
          <p>{t('text:text.imprint')}</p>
        </div>
      </div>
    </>
  )
}

export default Imprint
