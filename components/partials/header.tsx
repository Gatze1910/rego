import { useRouter } from 'next/router'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import { useAuth } from '../../context/AuthContext'

export const Header = () => {
  const { user, logOut } = useAuth()
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
      link: '/',
    },
    {
      id: 3,
      name: 'nav.recipe',
      link: '/',
    },
    {
      id: 4,
      name: 'nav.login',
      link: '/login',
    },
  ]

  const handleLogout = async () => {
    try {
      await logOut()
      router.push('/login')
    } catch (error: any) {
      console.log(error.message)
    }
  }

  return (
    <>
      <div className="uk-padding uk-flex uk-flex-between">
        <div>logo</div>

        <nav className="nav uk-flex">
          <ul>
            {!user.uid ? (
              menuItems.map((item) => {
                return (
                  <li key={item.id}>
                    <Link href={item?.link}>{t(item?.name)}</Link>
                  </li>
                )
              })
            ) : (
              <>
                <li>
                  <Link href="/shops/create">register a shop</Link>
                </li>
                <li>
                  <a onClick={handleLogout}>{t('nav.logout')}</a>
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
