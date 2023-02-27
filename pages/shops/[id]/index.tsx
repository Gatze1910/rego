import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import { Product } from '../../../components/partials/product'
import { Categories } from '../../../components/partials/categories'
import Image from 'next/image'
import insta from '../../../assets/icons/instagram.png'
import {
  ButtonPrimary,
  ButtonSecondary,
} from '../../../components/basic/button'
import { gql, useQuery } from '@apollo/client'

export const Shop = () => {
  const router = useRouter()
  const { id } = router.query
  const { t } = useTranslation('common')

  return (
    <>
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <div className="uk-flex">
            <div className="uk-width-3-5 uk-position-relative">
              <Image
                className="uk-padding-large uk-padding-remove-vertical uk-padding-remove-left"
                src={insta}
                alt="lbbla"
                fill={true}
              />
            </div>

            <div className="uk-width-2-5">
              <h2>Bauernhof Rudi</h2>
              <p>
                Bauernhofstraße 1<br />
                9020 Klagenfurt
                <br />
                Österreich
              </p>

              <h3>Öffnungszeiten</h3>
              <p>Jeden Samstag von 13:00 bis 14:00 Uhr</p>

              <h3>Kontakt</h3>
              <p>
                Rudi@bauernhof.at
                <br />
                0650/123 456
              </p>

              <div className="uk-flex uk-flex-between">
                <ButtonPrimary>Auf Karte anzeigen</ButtonPrimary>
                <ButtonPrimary>Route berechnen</ButtonPrimary>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <Categories />
        </div>
      </div>

      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h2>Unsere Produkte im Überblick</h2>
          <ButtonPrimary>filter</ButtonPrimary>

          <div className="uk-flex uk-margin-medium-top">
            <div className="uk-grid uk-grid-large uk-width-1-1 uk-child-width-1-3 uk-grid-row-large">
              <Product />
              <Product />
              <Product />
              <Product />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Shop
