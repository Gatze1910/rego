import useTranslation from 'next-translate/useTranslation'
import Head from 'next/head'
import { ButtonLink } from '../components/basic/button'
import Image from 'next/image'
import shopImage from '../assets/icons/shop.png'
import { gql, useLazyQuery } from '@apollo/client'
import { useUser } from '@auth0/nextjs-auth0/client'
import { useEffect } from 'react'

const GET_SHOPS = gql`
  query ShopsByOwner($ownerUuid: String!) {
    shopsByOwner(ownerUuid: $ownerUuid) {
      id
      name
      street
      postcode
      place
      image
    }
  }`

export const MyShops = () => {
  const { user } = useUser()
  const { t } = useTranslation('basic')

  const [loadShops, shopsResult] = useLazyQuery(GET_SHOPS, {
    variables: { ownerUuid: user?.sub },
  })

  useEffect(() => {
    if (user?.sub) {
      loadShops()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  if (shopsResult.loading || !shopsResult.called) return <>Loading...</>
  if (shopsResult.error) return <>Error!</>

  return (
    <>
      <Head>
        <title>{t('title.short', { subtitle: t('nav.myShops') })}</title>
      </Head>
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>{t('text:heading.profile')}</h1>
          <ButtonLink href="/shops/create">{t('basic:button.newShop')}</ButtonLink>
        </div>
      </div>

      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>{t('text:heading.myshops')}</h1>

          <div className="uk-grid uk-child-width-1-1 uk-child-width-1-2@l uk-margin-remove" uk-grid>
            {shopsResult.data.shopsByOwner.map((shop) =>
            (<div className="myshops uk-padding uk-padding-remove-left uk-flex uk-flex-middle flex-gap-medium" key={shop.id}>
              <div className='profile-picture uk-width-1-3 myshops__picture'>
                {/* eslint-disable */}
                {!shop.image ? (
                  <Image
                    src={shopImage}
                    alt={t('basic:alt.shop')}
                  />
                ) : (
                  <img
                    src={shop.image}
                    alt={t('basic:alt.profile')}
                  />
                )}
                {/* eslint-enable */}
              </div>
              <div>
                <h3>{shop.name}</h3>
                <p>{shop.street}<br />{shop.postcode} {shop.place}</p>
                <div className="uk-flex flex-gap">
                  <ButtonLink href={`/shops/${shop.id}`}>{t('basic:button.view')}</ButtonLink>
                  <ButtonLink href={`/shops/${shop.id}/edit`}>{t('basic:button.edit')}</ButtonLink>
                </div>
              </div>
            </div>))}

          </div>
        </div>
      </div>
    </>
  )
}

export default MyShops
