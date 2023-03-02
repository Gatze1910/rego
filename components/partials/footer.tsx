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
      name: 'nav.imprint',
      link: '/imprint',
    },
    {
      id: 2,
      name: 'nav.privacy',
      link: '/privacy',
    },
  ]

  return (
    <>
      <div className="uk-section footer">
        <div className="uk-container uk-container-large">
          <div className="uk-grid uk-child-width-1-1 uk-child-width-1-3@m">
            <h4>
              {t('rego')}
            </h4>

            <nav className="nav uk-flex uk-flex-center@m">
              <ul className="">
                {menuItems.map((item) => {
                  return (
                    <li key={item.id}>
                      <Link href={item?.link}>{t(item?.name)}</Link>
                    </li>
                  )
                })}
              </ul>
            </nav>

            <div className="uk-text-right@m">
              <a href="https://instagram.com">
                {t('follow')}
                <span
                  className="uk-margin-small-left uk-form-icon-flip"
                  uk-icon="icon: instagram"
                ></span>
              </a>
            </div>
          </div>
          <div className="uk-padding uk-padding-remove-horizontal uk-padding-remove-bottom uk-text-center@m">
            © {t('rego')} {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </>
  )
}
