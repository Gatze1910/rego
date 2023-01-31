import { useRouter } from 'next/router'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'

export const Header = () => {
  const router = useRouter()
  const { t } = useTranslation('basic')

  return (
    <>
      <div className="uk-padding uk-flex uk-flex-between">
        <div>logo</div>

        <nav className="nav uk-flex">
          <ul>
            <li>
              <Link href="">{t('nav.map')}</Link>
            </li>
            <li>
              <Link href="">{t('nav.news')}</Link>
            </li>
            <li>
              <Link href="">{t('nav.sell')}</Link>
            </li>
            <li>
              <Link href="">{t('nav.buy')}</Link>
            </li>
            <li>
              <Link href="">{t('nav.recipe')}</Link>
            </li>
          </ul>
        </nav>

        <div>
          <Link href={router.pathname} locale="de">
            <p>{t('de')}</p>
          </Link>
          <Link href={router.pathname}locale="en">
            <p>{t('en')}</p>
          </Link>
        </div>
      </div>
    </>
  )
}
