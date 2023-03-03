import { ReactNode } from 'react'
import { gql, useQuery } from '@apollo/client'
import Image from 'next/image'
import shopImage from '../../assets/icons/shop.png'
import { ButtonPrimary, ButtonLink } from '../basic/button'
import { Category } from '../partials/categories'
import { CATEGORIES } from '../../assets/categories'
import useTranslation from 'next-translate/useTranslation'

interface ViewProps {
    shopId: Number
}

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

export const MiniView = (props: ViewProps) => {
    const { t } = useTranslation()
    const { loading, error, data } = useQuery(GetShopData, {
        variables: { id: props.shopId },
    })

    if (loading) return <p>Loading...</p>
    if (error) return <p>Currently there is no production database available..</p>

    const categoryArray = JSON.parse(data.shop.categories)

    const activeCategories = CATEGORIES.filter((category) =>
        categoryArray?.includes(category.id)
    )

    var shopUrl = "/shops/" + props.shopId

    return (
        <>
            <div className="uk-flex uk-flex-middle uk-padding-small uk-padding-remove-horizontal">
                <div className="uk-width-1-3 uk-margin-medium-right profile-picture">
                    {!data.shop.image ? (
                        <Image
                            className="background-orange uk-padding-small"
                            src={shopImage}
                            alt={t('basic:alt.shop')}
                        />
                    ) : (
                        <img
                            className="profile-picture uk-width-1-2 uk-margin-large-right"
                            src={data.shop.image} alt={t('basic:alt.profile')}
                        />
                    )}
                </div>
                <div className="uk-width-2-3">
                    <h3>{data.shop.name}</h3>
                    <p>
                        {data.shop.street}<br />
                        {data.shop.postcode} {data.shop.place}
                    </p>
                </div>
            </div>

            {(data.shop.openingHours || data.shop.email || data.shop.phone) && (
                <div className="uk-padding-small uk-padding-remove-horizontal">
                    {data.shop.openingHours && (
                        <>
                            <h4>{t('basic:hours')}</h4>
                            <p>{data.shop.openingHours}</p>
                        </>
                    )}

                    {(data.shop.email || data.shop.phone) && (
                        <>
                            <h4>{t('basic:contact')}</h4>
                            <p>
                                {data.shop.email && data.shop.email}
                                <br />
                                {data.shop.phone && data.shop.phone}
                            </p>
                        </>
                    )}
                </div>
            )}


            {activeCategories.length > 0 && (
                <div className="uk-padding-small uk-padding-remove-horizontal">
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
            )}

            <div className="uk-flex flex-gap">
                <ButtonLink href={shopUrl}>{t('basic:button.visit')}</ButtonLink>
                <ButtonLink href="">{t('basic:button.route')}</ButtonLink>
            </div>
        </>
    )
}

export default MiniView