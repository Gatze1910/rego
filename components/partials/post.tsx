import Image from 'next/image'
import insta from '../../assets/icons/instagram.png'

export const Post = () => {
  return (
    <>
      <div className="uk-padding uk-margin-medium box-shadow">
        <h3>veröffentlicht von Bauernhof Rudi, 03.03.2023</h3>
        <h2>Es gibt etwas neues am Hof</h2>
        <p>
          Bei uns am Hof steht etwas an, komm vorbei und überzeug dich. Wir
          haben viele neue Produkte und unsere Tiere freuen sich auf Besuch und
          Futter.
        </p>
        <a href="https://google.com">
          <span uk-icon="icon: chevron-right"></span>Bauernhof Rudi besuchen
        </a>
      </div>
    </>
  )
}

export const Card = () => {
  return (
    <>
      <a href="" className="uk-card">
        <div className="post-container uk-padding">
          <div>
            <h3>title</h3>
            <p>text</p>
          </div>

          <div className="uk-position-relative">
            <Image
              className="img-container"
              src={insta}
              alt="lbbla"
              width={40}
              height={40}
            />
            <span className="uk-margin-left">autor</span>
          </div>
        </div>
      </a>
    </>
  )
}
