import useTranslation from 'next-translate/useTranslation'
import Head from 'next/head'

export const Custom500 = () => {
  const { t } = useTranslation('basic')

  return <>
    <Head>
      <title>{t('title.short', { subtitle: t('title.500') })}</title>
    </Head>

    <div className="uk-section">
      <div className="uk-container uk-container-large">
        <h1>{t('title.500')}</h1>
      </div>
    </div>
  </>
}

export default Custom500
