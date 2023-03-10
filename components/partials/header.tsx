import { useRouter } from 'next/router'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import logo from '../../assets/icons/logo-small.svg'
import Image from 'next/image'
import { useUser } from '@auth0/nextjs-auth0/client'
import { useEffect, useState } from 'react'

export const Header = () => {
  const { user } = useUser()
  const router = useRouter()
  const { locale } = useRouter()
  const { t } = useTranslation('basic')

  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  useEffect(() => {
    document.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenuOpen(false)))
  }, [user])

  const menuItems = [
    {
      id: 1,
      name: 'nav.map',
      link: '/shops',
    },
    {
      id: 2,
      name: 'nav.news',
      link: '/news',
    },
    {
      id: 3,
      name: 'nav.recipe',
      link: '/recipes',
    },
  ]

  return (
    <>
      <div className="uk-visible@l header uk-position-fixed uk-width-1-1 uk-padding uk-padding-remove-vertical uk-flex uk-flex-between uk-flex-middle">
        <Link href="/">
          <Image
            className="img-container"
            src={logo}
            alt={t('basic:alt.logo')}
            width={40}
            height={40}
          />
        </Link>

        <nav className="nav uk-flex">
          <ul>
            {menuItems.map((item) => {
              return (
                <li key={item.id}>
                  <Link href={item?.link}>{t(item?.name)}</Link>
                </li>
              )
            })}

            {!user ? (
              <>
                <li>
                  <Link href="/api/auth/login">{t('nav.login')}</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/myshops">{t('nav.myShops')}</Link>
                </li>
                <li>
                  <Link href="/api/auth/logout">{t('nav.logout')}</Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        {locale == 'en' ? (
          <Link href={router.asPath} locale="de">
            {t('de')}
          </Link>
        ) : (
          <Link href={router.asPath} locale="en">
            {t('en')}
          </Link>
        )}
      </div>

      <div className="uk-hidden@l header uk-container uk-container-large uk-position-fixed uk-width-1-1 uk-flex uk-flex-between uk-flex-middle">
        <Link href="/">
          <Image
            className="img-container"
            src={logo}
            alt={t('basic:alt.logo')}
            width={40}
            height={40}
          />
          <span>{t('rego')}</span>
        </Link>
        <div>
          <span uk-icon={'icon: ' + (menuOpen ? 'close' : 'menu')} onClick={() => { setMenuOpen(!menuOpen) }} className="hamburger"></span>
          <div className={'mobile box-shadow ' + (menuOpen ? 'mobile--open' : '')}>
            <div className="background-orange uk-padding-small">
              {!user ? (
                <div>
                  <span className="uk-margin-small-right" uk-icon="icon: sign-in"></span>
                  <Link href="/api/auth/login">{t('nav.login')}</Link>
                </div>
              ) : (
                <div>
                  <Link href="/api/auth/logout"><span className="uk-margin-small-right" uk-icon="icon: sign-out"></span>{t('nav.logout')}</Link>
                </div>
              )}
            </div>
            <nav className="nav uk-flex">
              <ul className="uk-padding-remove">
                {menuItems.map((item) => {
                  return (
                    <li key={item.id}>
                      <Link href={item?.link}>{t(item?.name)}</Link>
                    </li>
                  )
                })}

                {user && (
                  <li>
                    <Link href="/myshops">{t('nav.myShops')}</Link>
                  </li>
                )}
              </ul>
            </nav>

            <div className="uk-padding uk-text-center">
              {locale == 'en' ? (
                <Link href={router.asPath} locale="de">
                  {t('de')}
                </Link>
              ) : (
                <Link href={router.asPath} locale="en">
                  {t('en')}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
