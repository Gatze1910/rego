import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useUser } from '@auth0/nextjs-auth0/client'

export const Footer = () => {
  const { t } = useTranslation('basic')
  const { user } = useUser()
  const router = useRouter()

  const menuItems = [
    {
      id: 1,
      name: 'nav.map',
      link: '/shops',
    },
    {
      id: 2,
      name: 'nav.imprint',
      link: '/imprint',
    },
    {
      id: 3,
      name: 'nav.privacy',
      link: '/privacy',
    },
  ]

  return (
    <>
      <div className="uk-section footer">
        <div className="uk-container uk-container-large">
          <div className="">
            {/* <svg className="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#DC8744" fill-opacity="1" d="M0,32L60,64C120,96,240,160,360,181.3C480,203,600,181,720,149.3C840,117,960,75,1080,85.3C1200,96,1320,160,1380,192L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
      </svg> */}

            <div className="content uk-flex uk-flex-between uk-flex-middle">
              <div>{t('rego')}</div>

              <nav className="nav">
                <ul>
                  {menuItems.map((item) => {
                    return (
                      <li key={item.id}>
                        <Link href={item?.link}>{t(item?.name)}</Link>
                      </li>
                    )
                  })}
                  {!user ? (
                    <li>
                      <Link href="/api/auth/login">{t('nav.login')}</Link>
                    </li>
                  ) : (
                    <li>
                      <Link href="/api/auth/logout">{t('nav.logout')}</Link>
                    </li>
                  )}
                </ul>
              </nav>

              <div className="uk-inline">
                <a href="https://instagram.com">
                  {t('follow')}
                  <span
                    className="uk-margin-small-left uk-form-icon-flip"
                    uk-icon="icon: instagram"
                  ></span>
                </a>
              </div>
            </div>

            <a href="#" uk-icon="icon: chevron-up" className="uk-totop"></a>
          </div>
        </div>
      </div>
    </>
  )
}
