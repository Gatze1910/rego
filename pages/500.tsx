import useTranslation from 'next-translate/useTranslation'

export const Custom500 = () => {
  const { t } = useTranslation('basic')

  return <h1>{t('error.500')}</h1>
}

export default Custom500
