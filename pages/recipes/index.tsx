import useTranslation from 'next-translate/useTranslation'
import Head from 'next/head'

export const Recipe = () => {
    const { t } = useTranslation()

    return (
        <>
            <Head>
                <title>{t('basic:title.short', { subtitle: t('basic:nav.recipe') })}</title>
            </Head>
            <div className="uk-section">
                <div className="uk-container uk-container-large">
                    <h1>{t('text:heading.recipe')}</h1>
                    <p>{t('text:text.recipe')}</p>
                </div>
            </div>
        </>
    )
}

export default Recipe
