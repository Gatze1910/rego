import { useRouter } from 'next/router'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'

export const Header = () => {
  const router = useRouter()
  const { t } = useTranslation('basic')

  return (
    <>
      <div>
        <div>logo</div>
        <nav>nav</nav>
        <div>
          <Link href={router.pathname} locale="de">
            <h2>{t('de')}</h2>
          </Link>
          <Link href={router.pathname} locale="en">
            <h2>{t('en')}</h2>
          </Link>
        </div>
      </div>
      <p>des is a Header</p>
    </>
  )
}
