import { Post } from '../../components/partials/post'
import { Input, Select, Search } from '../../components/basic/formfields'
import Head from 'next/head'
import useTranslation from 'next-translate/useTranslation'

export const News = () => {
  const { t } = useTranslation('basic')

  return (
    <>
      <Head>
        <title>{t('title.short', { subtitle: t('nav.news') })}</title>
      </Head>
      <div className="uk-section uk-padding-remove-bottom">
        <div className="uk-container uk-container-small">
          <div className="uk-text-center">
            <h1>Aktuelles bei ReGo</h1>
            <p>
              Hie steht ein Text zur Einleitung der Info Seite Hie steht ein
              Text zur Einleitung der Info Seite Hie steht ein Text zur
              Einleitung der Info Seite Hie steht ein Text zur Einleitung der
              Info Seite Hie steht ein Text zur Einleitung der Info Seite Hie
              steht ein Text zur Einleitung der Info Seite
            </p>
          </div>
        </div>
      </div>
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <div className="uk-flex flex-gap-large">
            <div className="uk-width-2-3">
              <div className="uk-padding-large uk-padding-remove-horizontal uk-padding-remove-top">
                <Search placeholder="Suche" className="test" />
              </div>
              <div>
                <Post />
                <Post />
                <Post />
              </div>
            </div>
            <div className="uk-width-1-3 box-shadow uk-padding height-fit">
              <div>
                <h3>Sortieren</h3>
                <input type="text" placeholder="" />
              </div>
              <div>
                <h3>Filtern</h3>
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
