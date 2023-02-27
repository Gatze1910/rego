import { useUser } from '@auth0/nextjs-auth0/client'
import { gql, useMutation } from '@apollo/client'
import { ChangeEvent, useState } from 'react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { FileInput, Input, Submit } from '../../components/basic/formfields'
import { FormProvider, useForm } from 'react-hook-form'
import useTranslation from 'next-translate/useTranslation'
import Head from 'next/head'
import Image from 'next/image'
import insta from '../../assets/icons/instagram.png'

const ADD_SHOP = gql`
  mutation createShop(
    $name: String!
    $street: String!
    $postcode: Int!
    $place: String!
    $latitude: Float!
    $longitude: Float!
  ) {
    createShop(
      name: $name
      street: $street
      postcode: $postcode
      place: $place
      latitude: $latitude
      longitude: $longitude
    ) {
      id
    }
  }
`

export interface ShopFields {
  name: string
  postcode: number
  street: string
  place: string
  image: string
  phone: number
  email: string
  website: string
  openingHours: string
  categories: string
}

const CreateShop = () => {
  const tF = useTranslation('form').t
  const tB = useTranslation('basic').t

  const { user } = useUser()
  const supabase = createBrowserSupabaseClient()
  const [image, setImage] = useState(null)
  const [shop, { data, loading, error }] = useMutation(ADD_SHOP)

  const methods = useForm<ShopFields>({ mode: 'onChange' })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods

  const onSubmit = async (data: ShopFields) => {
    shop({
      variables: {
        name: data.name,
        street: data.street,
        postcode: Number(data.postcode),
        place: data.place,
        latitude: 45.22,
        longitude: 23.45,
      },
    })
  }

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    let file

    if (e.target.files) {
      file = e.target.files[0]
    }

    const { data, error } = await supabase.storage
      .from('shop')
      .upload('public/' + file?.name, file as File)

    if (data) {
      console.log(data)
      let path = data.path
      setImage(
        'https://rvplealboqicxmexeqdd.supabase.co/storage/v1/object/public/shop/public/Contacta-2022-Web-238.jpg',
      )
    } else if (error) {
      console.log(error)
    }
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
          <div className="uk-grid uk-grid-small">
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
                type="phone"
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
            </div>
            <div className="uk-width-1-2@m uk-margin-top">
              <div className="uk-flex uk-flex-center">
                <div className="uk-width-1-2">
                  {image ? (
                    <img src={image} alt={'profile picture'} />
                  ) : (
                    <Image src={insta} alt={'profile picture'} />
                  )}
                  <FileInput
                    placeholder="Bild auswählen"
                    icon="image"
                    flipicon
                    label="Bild"
                    accept="image/*"
                    onChange={(e) => {
                      handleImageUpload(e)
                      console.log('test')
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <Submit id="register" value="Shop erstellen" />
        </form>
      </FormProvider>
    </div>
  )
}

export default CreateShop
