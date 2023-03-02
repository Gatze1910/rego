import { Post } from '../../components/partials/post'
import { Input, Select, Search } from '../../components/basic/formfields'
import Head from 'next/head'
import useTranslation from 'next-translate/useTranslation'
import { ButtonSecondary } from '../../components/basic/button'
import getT from 'next-translate/getT'

export const News = () => {

  const { t } = useTranslation()

  return (
    <>
      <Head>
        <title>{t('basic:title.short', { subtitle: t('nav.news') })}</title>
      </Head>
      <div className="uk-section uk-padding-remove-bottom">
        <div className="uk-container uk-container-small">
          <div className="uk-text-center">
            <h1>{t('text:heading.news')}</h1>
            <p>
              {t('text:text.news')}
            </p>
          </div>
        </div>
      </div>
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <div className="uk-flex flex-gap-large">
            <div className="uk-width-1-1 uk-width-2-3@l">
              <div className="uk-padding-large uk-padding-remove-horizontal uk-padding-remove-top">
                <Search placeholder="Suche" className="test" />
              </div>
              <div className="uk-hidden@l uk-text-right uk-margin-medium-bottom">
                <ButtonSecondary>{t('basic:button.filter')}</ButtonSecondary>
              </div>
              <div>
                <Post />
                <Post />
                <Post />
              </div>
            </div>
            <div className="uk-visible@l uk-width-1-3 box-shadow uk-padding height-fit">
              <div>
                <h3>{t('basic:button.sort')}</h3>
                <input type="text" placeholder="" />
              </div>
              <div>
                <h3>{t('basic:button.filter')}</h3>
                <div>categories</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default News
