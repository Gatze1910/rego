import ProtectedRoute from "../../components/basic/ProtectedRoute"

const CreateShop = () => {
  return (
    <ProtectedRoute>
      <h2>You are logged in! You are able to create a shop</h2>
    </ProtectedRoute>
  )
}

export default CreateShop
