import { useRouter } from 'next/router'
import Image from 'next/image'
import insta from '../../../assets/icons/instagram.png'
import { Category } from '../../../components/partials/categories'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import {
  FileInput,
  Input,
  Submit,
  Textarea,
} from '../../../components/basic/formfields'
import { FormProvider, useForm } from 'react-hook-form'
import useTranslation from 'next-translate/useTranslation'
import Head from 'next/head'
import mapboxgl from 'mapbox-gl'
import { v4 } from 'uuid'
import { CATEGORIES } from '../../../assets/categories'
import Router from 'next/router'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAP_ACCESS_TOKEN

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

const EDIT_SHOP = gql`
  mutation updateShop(
    $id: Int!
    $name: String
    $street: String
    $postcode: String
    $place: String
    $latitude: Float
    $longitude: Float
    $phone: String
    $email: String
    $website: String
    $openingHours: String
    $image: String
    $categories: String
  ) {
    updateShop(
      id: $id
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
  phone: string
  email: string
  website: string
  openingHours: string
}

async function getGeo(streetname: string, postcode: string, place: string) {
  const searchText = `${streetname}%20${postcode}%20${place} `
  const data = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchText}.json?access_token=${mapboxgl.accessToken}`
  )
  const parsedData = await data.json()
  return parsedData.features[0].center
}

export const EditShop = () => {
  const router = useRouter()
  const { id } = router.query

  const { t } = useTranslation()

  const shopResult = useQuery(GetShopData, {
    variables: { id: Number(id) },
  })
  const [editShop, editShopResult] = useMutation(EDIT_SHOP)

  const supabase = createBrowserSupabaseClient()
  const [image, setImage] = useState(null)
  const [persistedImage, setPersistedImage] = useState(null)
  const [categories, setCategories] = useState<number[]>([])

  useEffect(() => {
    setCategories(
      shopResult.data?.shop.categories
        ? JSON.parse(shopResult.data?.shop.categories)
        : []
    )
    setPersistedImage(shopResult.data?.shop.image ?? null)
    methods.setValue('name', shopResult.data?.shop.name)
    methods.setValue('street', shopResult.data?.shop.street)
    methods.setValue('postcode', shopResult.data?.shop.postcode)
    methods.setValue('place', shopResult.data?.shop.place)
    methods.setValue('email', shopResult.data?.shop.email)
    methods.setValue('phone', shopResult.data?.shop.phone)
    methods.setValue('website', shopResult.data?.shop.website)
    methods.setValue('openingHours', shopResult.data?.shop.openingHours)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopResult.data])

  const methods = useForm<ShopFields>({
    mode: 'onChange',
  })

  if (shopResult.loading || editShopResult.loading) return <>Loading...</>
  if (shopResult.error || editShopResult.error) return <>Error!</>
  if (shopResult.data) {
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
      let imageUploadError = false
      let filename: string

      if (image) {
        let randomuuid = v4()
        filename =
          process.env.NEXT_PUBLIC_SUPABASE_PICTURE_STORAGE +
          randomuuid +
          image.name
        try {
          await supabase.storage
            .from('shop')
            .upload('public/' + randomuuid + image.name, image as File)
            .then((res) => {
              if (res.error) throw new Error('error')
            })
        } catch (error) {
          imageUploadError = true
          console.log(error)
          toast.error('Image upload was not successful', {
            position: toast.POSITION.TOP_RIGHT,
          })
        }
      }

      if (imageUploadError) return

      try {
        editShop({
          variables: {
            id: Number(id),
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
            image: image ? filename : persistedImage,
          },
        }).then((shopResponse) => {
          Router.push('/shops/' + shopResponse.data.updateShop.id)
        })
      } catch (error) {
        toast.error(
          'An error occurred during saving your shop changes, please try again',
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        )
      }
    }

    return (
      <div className="uk-section uk-container uk-container-large">
        <Head>
          <title>
            {t('basic:title.short', { subtitle: t('basic:title.editShop') })}
          </title>
        </Head>

        <h1>{t('basic:title.editShop')}</h1>

        <ToastContainer />

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
                  placeholder={t('form:placeholder.name')}
                  icon="user"
                  flipicon
                  label={t('form:label.name')}
                  validation={{
                    field: 'name',
                    register,
                    error: errors.name,
                    option: {
                      required: t('form:error.required'),
                    },
                  }}
                />

                <Input
                  id="street"
                  type="text"
                  placeholder={t('form:placeholder.street')}
                  icon="location"
                  flipicon
                  label={t('form:label.street')}
                  validation={{
                    field: 'street',
                    register,
                    error: errors.street,
                    option: {
                      required: t('form:error.required'),
                      minLength: {
                        value: 5,
                        message: t('form:error.minLength', { count: '5' }),
                      },
                    },
                  }}
                />

                <div className="uk-flex flex-gap">
                  <div className="uk-width-1-3">
                    <Input
                      id="postcode"
                      type="text"
                      placeholder={t('form:placeholder.postcode')}
                      icon="location"
                      flipicon
                      label={t('form:label.postcode')}
                      validation={{
                        field: 'postcode',
                        register,
                        error: errors.postcode,
                        option: {
                          required: t('form:error.required'),
                          pattern: {
                            value: /^[0-9]+$/,
                            message: t('form:error.pattern'),
                          },
                          minLength: {
                            value: 4,
                            message: t('form:error.minLength', { count: '4' }),
                          },
                        },
                      }}
                    />
                  </div>

                  <div className="uk-width-2-3">
                    <Input
                      id="place"
                      type="text"
                      placeholder={t('form:placeholder.place')}
                      icon="location"
                      flipicon
                      label={t('form:label.place')}
                      validation={{
                        field: 'place',
                        register,
                        error: errors.place,
                        option: {
                          required: t('form:error.required'),
                          minLength: {
                            value: 2,
                            message: t('form:error.minLength', { count: '2' }),
                          },
                        },
                      }}
                    />
                  </div>
                </div>

                <Input
                  id="email"
                  type="text"
                  placeholder={t('form:placeholder.email')}
                  icon="mail"
                  flipicon
                  label={t('form:label.email')}
                  validation={{
                    field: 'email',
                    register,
                    error: errors.email,
                  }}
                />

                <Input
                  id="phone"
                  type="tel"
                  placeholder={t('form:placeholder.phone')}
                  icon="receiver"
                  flipicon
                  label={t('form:label.phone')}
                  validation={{
                    field: 'phone',
                    register,
                    error: errors.phone,
                  }}
                />

                <Input
                  id="website"
                  type="text"
                  placeholder={t('form:placeholder.web')}
                  icon="link"
                  flipicon
                  label={t('form:label.web')}
                  validation={{
                    field: 'website',
                    register,
                    error: errors.website,
                  }}
                />

                <Textarea
                  id="openingHours"
                  placeholder={t('form:placeholder.hours')}
                  label={t('form:label.hours')}
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
                    {/* eslint-disable */}
                    {image ? (
                      <img
                        src={URL.createObjectURL(image)}
                        alt={'profile picture'}
                      />
                    ) : persistedImage ? (
                      <img src={persistedImage} alt={'profile picture'} />
                    ) : (
                      <Image src={insta} alt={'profile picture'} />
                    )}
                    {/* eslint-enable */}
                    <FileInput
                      placeholder={t('form:placeholder.image')}
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
              <p>{t('form:label.categories')}</p>
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

            <Submit id="save" value={t('form:button.save')} />
          </form>
        </FormProvider>
      </div>
    )
  }
}

export default EditShop
