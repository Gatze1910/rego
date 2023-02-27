import { useRouter } from 'next/router'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import logo from '../../assets/icons/logo-small.svg'
import Image from 'next/image'
import { useUser } from '@auth0/nextjs-auth0/client'

export const Header = () => {
  const { user } = useUser()
  const router = useRouter()
  const { locale } = useRouter()
  const { t } = useTranslation('basic')

  const menuItems = [
    {
      id: 1,
      name: 'nav.map',
      link: '/',
    },
    {
      id: 2,
      name: 'nav.news',
      link: '/news',
    },
    {
      id: 3,
      name: 'nav.recipe',
      link: '/',
    },
  ]

  return (
    <>
      <div className="header uk-position-fixed uk-width-1-1 uk-padding uk-flex uk-flex-between uk-flex-middle">
        <div>
          <Image
            className="img-container"
            src={logo}
            alt="lbbla"
            width={40}
            height={40}
          />
        </div>

        <nav className="nav uk-flex">
          <ul>
            {!user ? (
              <>
                <li>
                  <Link href="/api/auth/login">{t('nav.login')}</Link>
                </li>

                {menuItems.map((item) => {
                  return (
                    <li key={item.id}>
                      <Link href={item?.link}>{t(item?.name)}</Link>
                    </li>
                  )
                })}
              </>
            ) : (
              <>
                <li>
                  <Link href="/shops/create">register a shop</Link>
                </li>
                <li>
                  <Link href="/api/auth/logout">{t('nav.logout')}</Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        {locale == 'en' ? (
          <Link href={router.pathname} locale="de">
            {t('de')}
          </Link>
        ) : (
          <Link href={router.pathname} locale="en">
            {t('en')}
          </Link>
        )}
      </div>
    </>
  )
}
