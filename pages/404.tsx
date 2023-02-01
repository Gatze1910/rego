import useTranslation from 'next-translate/useTranslation'
import Head from 'next/head'
import { Header } from '../components/partials/header'
import { Footer } from '../components/partials/footer'
import { Product } from '../components/partials/product'
import { Post } from '../components/partials/post'
import { Categories } from '../components/partials/categories'

export const Custom404 = () => {
  const { t } = useTranslation('basic')

  return (
    <>
      <Head>
        <title>
          {t('title.short', { subtitle: t('title.notFound') })}
        </title>
      </Head>
      <h1>{t('error.404')}</h1>
      <h2>ein Überschrift 2</h2>
      <h3>eine Überschrift 3</h3>

      <div className="uk-flex uk-flex-center">
        <div className="uk-grid uk-grid-large uk-width-1-1 uk-child-width-1-3 uk-grid-row-large">
          <Product />
          <Product />
          <Product />
          <Product />
        </div>
      </div>

      <div className="uk-flex uk-flex-center">
        <div className="uk-grid uk-grid-large uk-width-1-1 uk-child-width-1-3 uk-grid-row-large">
          <Post />
          <Post />
          <Post />
        </div>
      </div>

      <Categories />
    </>
  )
}

export default Custom404
