import Image from 'next/image'
import insta from '../../assets/icons/instagram.png'

const testjson = [
  {
    id: 1,
    img: 'instagram.png',
    color: 'red',
    text: 'essen',
  },
  {
    id: 2,
    img: 'instagram.png',
    color: 'blue',
    text: 'nahrung',
  },
]

export const Categories = () => {
  return (
    <>
      {/* <div
        style={{ background: 'blue' }}
        className="categorietest uk-flex uk-flex-center uk-flex-middle uk-flex-column uk-padding-small"
      >
        <Image
          className="img-container"
          src={insta}
          alt="lbbla"
          width={40}
          height={40}
        />
        <p className="uk-margin-remove">text</p>
      </div> */}

      <div className="flex-gap uk-flex">
        {testjson.map((item) => {
          return (
            <div
              key={item.id}
              style={{ background: item?.color }}
              className="categorietest uk-flex uk-flex-center uk-flex-middle uk-flex-column uk-padding-small"
            >
              <Image
                className="img-container"
                src={insta}
                alt="lbbla"
                width={40}
                height={40}
              />
              <p className="uk-margin-remove">{item?.text}</p>
            </div>
          )
        })}
      </div>
    </>
  )
}
