import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import { Product } from '../../../components/partials/product'
import { Category } from '../../../components/partials/categories'
import Image from 'next/image'
import shopImage from '../../../assets/icons/shop.png'
import { ButtonPrimary } from '../../../components/basic/button'
import { gql, useQuery } from '@apollo/client'
import { CATEGORIES } from '../../../assets/categories/categories'

const GetShopData = gql`
  query Shop($id: Int!) {
    shop(id: $id) {
      name
      street
      postcode
      place
      latitude
      longitude
      image
      phone
      email
      website
      openingHours
      categories
    }
  }
`

export const Shop = () => {
  const router = useRouter()
  const { id } = router.query
  const newId: number = +id
  const { t } = useTranslation()
  const { loading, error, data } = useQuery(GetShopData, {
    variables: { id: newId },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Currently there is no production database available..</p>

  const categoryArray = JSON.parse(data.shop.categories)

  const activeCategories = CATEGORIES.filter((category) =>
    categoryArray?.includes(category.id)
  )

  return (
    <>
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <div className="uk-grid uk-child-width-1-1 uk-child-width-1-2@m uk-flex-middle">
            <div className="profile-picture">
              {/* eslint-disable */}
              {!data.shop.image ? (
                <Image
                  className="background-orange-opaque uk-padding"
                  src={shopImage}
                  alt={t('basic:alt.shop')}
                />
              ) : (
                <img
                  className="uk-width-1-2 uk-margin-large-right"
                  src={data.shop.image} alt={t('basic:alt.profile')}
                />
              )}
              {/* eslint-enable */}
            </div>
            <div className="uk-padding">
              <h2>{data.shop.name}</h2>
              <p>
                {data.shop.street}
                <br />
                {data.shop.postcode} {data.shop.place}
              </p>
              {data.shop.website && <p>{data.shop.website}</p>}
              {data.shop.openingHours && (
                <>
                  <h3>{t('basic:hours')}</h3>
                  <p>{data.shop.openingHours}</p>
                </>
              )}

              {(data.shop.email || data.shop.phone) && (
                <>
                  <h3>{t('basic:contact')}</h3>
                  <p>
                    {data.shop.email && data.shop.email}
                    <br />
                    {data.shop.phone && data.shop.phone}
                  </p>
                </>
              )}
              <div className="uk-flex flex-gap-medium">
                <ButtonPrimary onClick={() => router.push('/shops#' + id)}>
                  {t('basic:button.map')}
                </ButtonPrimary>
                <ButtonPrimary>{t('basic:button.route')}</ButtonPrimary>
              </div>
            </div>
          </div>
        </div>
      </div>

      {activeCategories.length > 0 && (
        <div className="uk-section">
          <div className="uk-container uk-container-large">
            <div className="flex-gap uk-flex uk-flex-wrap">
              {activeCategories.map((a) => {
                return (
                  <Category
                    category={a}
                    isSelected={true}
                    onCategoryClick={() => { }}
                    key={a.id}
                  />
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h2>{t('text:heading.products')}</h2>
          <ButtonPrimary>{t('basic:button.filter')}</ButtonPrimary>

          <div className="uk-flex uk-margin-medium-top">
            <div className="uk-grid uk-grid-large uk-width-1-1 uk-child-width-1-1 uk-child-width-1-2@s uk-child-width-1-3@m uk-grid-row-large">
              <Product />
              <Product />
              <Product />
              <Product />
            </div>
          </div>
        </div>
      </div> */}
    </>
  )
}

export default Shop
