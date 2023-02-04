import ProtectedRoute from '../../components/basic/ProtectedRoute'
import { useUser } from '@auth0/nextjs-auth0/client'
import { gql, useMutation } from '@apollo/client'
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
  const user = useUser()
  

  if (!user) {
    window.location.href = 'localhost:3000'
  }


  const [shop, { data, loading, error }] = useMutation(ADD_SHOP)
  return (
    <>
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
    </>
  )
}

export default CreateShop
