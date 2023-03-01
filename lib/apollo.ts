import { ApolloClient, InMemoryCache } from '@apollo/client'

if (process.env.NODE_ENV === 'production') {
  const apolloClient = new ApolloClient({
    uri: 'https://rego-tau.vercel.app/api/graphql',
    cache: new InMemoryCache(),
  })
} else {
  const apolloClient = new ApolloClient({
    uri: 'http://localhost:3000/api/graphql',
    cache: new InMemoryCache(),
  })
}

export default apolloClient
