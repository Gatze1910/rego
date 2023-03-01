import { gql, useMutation } from '@apollo/client'
import { useState } from 'react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import {
  FileInput,
  Input,
  Submit,
  Textarea,
} from '../../components/basic/formfields'
import { FormProvider, useForm } from 'react-hook-form'
import useTranslation from 'next-translate/useTranslation'
import Head from 'next/head'
import Image from 'next/image'
import insta from '../../assets/icons/instagram.png'
import mapboxgl from 'mapbox-gl'
import { v4 } from 'uuid'
import { Categories, Category } from '../../components/partials/categories'
import { CATEGORIES } from '../../assets/categories'
import { redirect } from 'next/navigation'
import Router from 'next/router'
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAP_ACCESS_TOKEN

const ADD_SHOP = gql`
  mutation createShop(
    $name: String!
    $street: String!
    $postcode: String!
    $place: String!
    $latitude: Float!
    $longitude: Float!
    $phone: String
    $email: String
    $website: String
    $openingHours: String
    $image: String
    $categories: String
  ) {
    createShop(
      name: $name
      street: $street
      postcode: $postcode
      place: $place
      latitude: $latitude
      longitude: $longitude
      phone: $phone
      email: $email
      website: $website
      openingHours: $openingHours
      image: $image
      categories: $categories
    ) {
      id
    }
  }
`

export interface ShopFields {
  name: string
  postcode: string
  street: string
  place: string
  image: string
  phone: string
  email: string
  website: string
  openingHours: string
  categories: string
}

async function getGeo(streetname: string, postcode: string, place: string) {
  const searchText = `${streetname}%20${postcode}%20${place}`
  const data = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchText}.json?access_token=${mapboxgl.accessToken}`
  )
  const parsedData = await data.json()
  return parsedData.features[0].center
}

const CreateShop = () => {
  const tF = useTranslation('form').t
  const tB = useTranslation('basic').t

  const supabase = createBrowserSupabaseClient()
  const [image, setImage] = useState(null)
  const [categories, setCategories] = useState<number[]>([])
  const [shop, { data, loading, error }] = useMutation(ADD_SHOP)

  const methods = useForm<ShopFields>({ mode: 'onChange' })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods

  const onSubmit = async (shopData: ShopFields) => {
    const geoValues = await getGeo(
      shopData.street,
      shopData.postcode,
      shopData.place
    )
    let filename: string
    if (image) {
      let randomuuid = v4()
      filename =
        process.env.NEXT_PUBLIC_SUPABASE_PICTURE_STORAGE +
        randomuuid +
        image.name
      await supabase.storage
        .from('shop')
        .upload('public/' + randomuuid + image.name, image as File)
    }

    shop({
      variables: {
        name: shopData.name,
        street: shopData.street,
        postcode: shopData.postcode,
        place: shopData.place,
        latitude: geoValues[1],
        longitude: geoValues[0],
        phone: shopData.phone,
        email: shopData.email,
        website: shopData.website,
        openingHours: shopData.openingHours,
        categories: JSON.stringify(categories),
        image: filename,
      },
    }).then((shopResponse) => {
      Router.push('/shops/' + shopResponse.data.createShop.id)
    })
  }

  return (
    <div className="uk-section uk-container uk-container-large">
      <Head>
        <title>{tB('title.short', { subtitle: tB('title.createShop') })}</title>
      </Head>

      <h1>{tB('title.createShop')}</h1>

      <FormProvider {...methods}>
        <form
          className="uk-margin-medium-top"
          action=""
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="uk-grid uk-grid-small uk-flex-middle">
            <div className="uk-width-1-2@m">
              <Input
                id="name"
                type="text"
                placeholder="Mustershop"
                icon="user"
                flipicon
                label="Name des Shops"
                validation={{
                  field: 'name',
                  register,
                  error: errors.name,
                  option: {
                    required: tF('error.required'),
                  },
                }}
              />

              <Input
                id="street"
                type="text"
                placeholder="Musterstraße 12"
                icon="location"
                flipicon
                label="Adresse"
                validation={{
                  field: 'street',
                  register,
                  error: errors.street,
                  option: {
                    required: tF('error.required'),
                    minLength: {
                      value: 5,
                      message: tF('error.minLength', { count: '5' }),
                    },
                  },
                }}
              />

              <div className="uk-flex flex-gap">
                <div className="uk-width-1-3">
                  <Input
                    id="postcode"
                    type="text"
                    placeholder="5020"
                    icon="location"
                    flipicon
                    label="Postleitzahl"
                    validation={{
                      field: 'postcode',
                      register,
                      error: errors.postcode,
                      option: {
                        required: tF('error.required'),
                        pattern: {
                          value: /^[0-9]+$/,
                          message: tF('error.pattern'),
                        },
                        minLength: {
                          value: 4,
                          message: tF('error.minLength', { count: '4' }),
                        },
                      },
                    }}
                  />
                </div>

                <div className="uk-width-2-3">
                  <Input
                    id="place"
                    type="text"
                    placeholder="Salzburg"
                    icon="location"
                    flipicon
                    label="Ort"
                    validation={{
                      field: 'place',
                      register,
                      error: errors.place,
                      option: {
                        required: tF('error.required'),
                        minLength: {
                          value: 2,
                          message: tF('error.minLength', { count: '2' }),
                        },
                      },
                    }}
                  />
                </div>
              </div>

              <Input
                id="email"
                type="text"
                placeholder="mail@provider.at"
                icon="mail"
                flipicon
                label="E-Mail"
                validation={{
                  field: 'email',
                  register,
                  error: errors.email,
                }}
              />

              <Input
                id="phone"
                type="tel"
                placeholder="0650/232432434"
                icon="receiver"
                flipicon
                label="Telefonnummer"
                validation={{
                  field: 'phone',
                  register,
                  error: errors.phone,
                }}
              />

              <Input
                id="website"
                type="text"
                placeholder="https://my-website.at"
                icon="link"
                flipicon
                label="Webseite"
                validation={{
                  field: 'website',
                  register,
                  error: errors.website,
                }}
              />

              <Textarea
                id="openingHours"
                placeholder="MO - FR, von 09:00 - 15:00 Uhr"
                label="Öffnungszeiten"
                validation={{
                  field: 'openingHours',
                  register,
                  error: errors.openingHours,
                }}
              />
            </div>

            <div className="uk-width-1-2@m">
              <div className="uk-flex uk-flex-center uk-margin-top">
                <div className="uk-width-1-2 profile-picture">
                  {image ? (
                    <img
                      src={URL.createObjectURL(image)}
                      alt={'profile picture'}
                    />
                  ) : (
                    <Image src={insta} alt={'profile picture'} />
                  )}
                  <FileInput
                    placeholder="Bild auswählen"
                    icon="image"
                    flipicon
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        setImage(e.target.files[0])
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="uk-margin-medium-top">
            <p>Ausgewählte Kategorien werden farblich markiert</p>
            <div className="flex-gap uk-flex uk-flex-wrap">
              {CATEGORIES.map((category) => {
                return (
                  <Category
                    key={category.id}
                    category={category}
                    isSelected={categories.includes(category.id)}
                    onCategoryClick={() => {
                      const inCurrentCategories = categories.includes(
                        category.id
                      )

                      if (inCurrentCategories) {
                        setCategories((selectedCategories) =>
                          selectedCategories.filter(
                            (selectedCategory) =>
                              selectedCategory !== category.id
                          )
                        )
                      } else {
                        setCategories([...categories, category.id])
                      }
                    }}
                  />
                )
              })}
            </div>
          </div>

          <Submit id="register" value="Shop erstellen" />
        </form>
      </FormProvider>
    </div>
  )
}

export default CreateShop
