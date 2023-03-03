import Image from 'next/image'
import insta from '../../assets/icons/instagram.png'
import { CATEGORIES } from '../../assets/categories.js'
import useTranslation from 'next-translate/useTranslation'

export const Category = ({
  category,
  isSelected,
  onCategoryClick,
  variant = 'big',
}) => {
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
        alt={category.name}
        width={40}
        height={40}
      />
      <p className="uk-margin-remove uk-text-center">{category.name}</p>
    </div>
  )
}

export const Categories = () => {
  const { t } = useTranslation()

  return (
    <>
      <div className="flex-gap uk-flex uk-flex-wrap">
        {CATEGORIES.map((item) => {
          return (
            <div
              key={item.id}
              style={{ background: item?.color }}
              className="category uk-flex uk-flex-center uk-flex-middle uk-flex-column uk-padding-small box-shadow"
            >
              <Image
                className="img-container"
                src={item?.img}
                alt={t('basic:alt.category')}
                width={40}
                height={40}
              />
              <p className="uk-margin-remove uk-text-center">{item?.name}</p>
            </div>
          )
        })}
      </div>
    </>
  )
}
