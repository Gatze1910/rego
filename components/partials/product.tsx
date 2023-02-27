import Image from 'next/image'
import insta from '../../assets/icons/instagram.png';

export const Product = () => {
  return (
    <>
      <div className="product-container">
        <div className="img-container uk-flex uk-flex-center uk-position-relative">
          <Image className="uk-padding-small"
            src={insta}
            alt="lbbla"
            fill={true}
          />

          <div className="product-banner uk-position-top-left">
            Banner text
          </div>
        </div>
        <div className="uk-padding-small uk-padding-remove-horizontal">
          <h4>Eier</h4>
          <p>Von unseren glücklichen Hühnern</p>
        </div>
      </div>
    </>
  )
}
