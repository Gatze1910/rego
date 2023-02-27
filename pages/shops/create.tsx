import { useUser } from '@auth0/nextjs-auth0/client'
import { gql, useMutation } from '@apollo/client'
import { ChangeEvent, useState } from 'react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
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

const CreateShop = () => {
  const { user } = useUser()
  const supabase = createBrowserSupabaseClient()
  const [image, setImage] = useState(null)

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    let file;

    if (e.target.files) {
      file = e.target.files[0];
    }

    const { data, error } = await supabase.storage
      .from("shop")
      .upload("public/" + file?.name, file as File);

    if (data) {
      console.log(data);
      let path = data.path
      setImage("https://rvplealboqicxmexeqdd.supabase.co/storage/v1/object/public/shop/public/Contacta-2022-Web-238.jpg")
      

    } else if (error) {
      console.log(error);
    }
  };
  

  const [shop, { data, loading, error }] = useMutation(ADD_SHOP)
  return (
    <>
    <h1>image upload</h1>
    <input
        type="file"
        accept="image/*"
        className="block w-auto text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        id="file_input"
        onChange={(e) => {
          handleImageUpload(e); 
        }}
      />
      {image &&  <img src={image} />}
           

      <h2>You are logged in! You are able to create a shop</h2>
      <div style={{ ['margin-top' as any]: '50vh' }}>
        <form
          onSubmit={(e) => {
            e.preventDefault()

            shop({
              variables: {
                name: 'shop',
                street: 'test',
                postcode: 23445,
                place: 'testort',
                latitude: 45.22,
                longitude: 23.45,
              },
            })
          }}
        >
          <button type="submit">Add Shop zum Test</button>
        </form>
      </div>
      <div></div>
    </>
  )
}

export default CreateShop
