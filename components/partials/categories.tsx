import Image from 'next/image'
import insta from '../../assets/icons/instagram.png'
import { CATEGORIES } from '../../assets/categories/categories'
import useTranslation from 'next-translate/useTranslation'

export const Category = ({
  category,
  isSelected,
  onCategoryClick,
  variant = 'big',
}) => {

  const { t } = useTranslation()

  return (
    <div
      style={{ background: isSelected ? category.color : '#bbb' }}
      className="category uk-flex uk-flex-center uk-flex-middle uk-flex-column uk-padding-small box-shadow"
      onClick={() => {
        onCategoryClick()
      }}
    >
      <Image
        className="img-container"
        src={category.img}
        alt={t(`categories:${category.name}`)}
        width={40}
        height={40}
      />
      <p className="uk-margin-remove uk-text-center">{t(`categories:${category.name}`)}</p>
    </div>
  )
}

export const Categories = () => {
  const { t } = useTranslation()

  return (
    <>
      <div className="flex-gap uk-flex uk-flex-wrap">
        {CATEGORIES.map((category) => {
          return (
            <div
              key={category.id}
              style={{ background: category?.color }}
              className="category uk-flex uk-flex-center uk-flex-middle uk-flex-column uk-padding-small box-shadow"
            >
              <Image
                className="img-container"
                src={category?.img}
                alt={t(`categories:${category?.name}`)}
                width={40}
                height={40}
              />
              <p className="uk-margin-remove uk-text-center">{t(`categories:${category?.name}`)}</p>
            </div>
          )
        })}
      </div>
    </>
  )
}
