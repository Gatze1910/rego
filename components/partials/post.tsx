import Image from 'next/image'
import insta from '../../assets/icons/instagram.png';

export const Post = () => {
  return (
    <>
      <a href="" className="uk-card">
        <div className="post-container uk-padding">
          <div>
            <h3>title</h3>
            <p>text</p>
          </div>

          <div className="uk-position-relative">
            <Image className="img-container"
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
