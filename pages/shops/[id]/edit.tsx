import { useRouter } from 'next/router'
import Image from 'next/image'
import insta from '../../../assets/icons/instagram.png';
import { Product } from '../../../components/partials/product'
import { Categories } from '../../../components/partials/categories'

export const EditShop = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <p>hallo vom edit des shops {id}</p>

      <div className="uk-section uk-section-default">
        <div className="uk-grid uk-width-1-1 uk-child-width-1-2 uk-margin-remove">
          <div className="uk-position-relative">
            <Image className="uk-width-3-5"
              src={insta}
              alt="lbbla"
              fill={true}
            />
          </div>

          <div className="uk-width-2-5">
            <h2>Bauernhof Rudi</h2>
            <p>
              Bauernhofstraße 1<br />
              9020 klagenfurt<br />
              Österreich
            </p>

            <h3>Öffnungszeiten</h3>
            <p>Jeden Samstag von 14:00 bis 20:00 Uhr</p>

            <h3>Kontakt</h3>
            <p>
              Rudi@bauernhof.at<br />
              0650/123456
            </p>
          </div>
        </div>
      </div>

      <div className="uk-section uk-section-default">
        <Categories />
      </div>

      <div className="uk-section uk-section-default">
        <div className="uk-flex uk-flex-center">
          <div className="uk-grid uk-grid-large uk-width-1-1 uk-child-width-1-3 uk-grid-row-large">
            <Product />
            <Product />
            <Product />
            <Product />
          </div>
        </div>
      </div>

    </>
  )
}

export default EditShop
