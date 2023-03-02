import useTranslation from 'next-translate/useTranslation'
import Head from 'next/head'

export const Privacy = () => {
  const { t } = useTranslation()

  return (
    <>
      <Head>
        <title>{t('basic:title.short', { subtitle: t('basic:nav.privacy') })}</title>
      </Head>
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>{t('text:heading.privacy')}</h1>
          <p>{t('text:text.privacy')}</p>
        </div>
      </div>
    </>
  )
}

export default Privacy
