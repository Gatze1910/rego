import { ApolloClient, InMemoryCache } from '@apollo/client'

let apolloClient = new ApolloClient({
   uri: 'http://localhost:3000/api/graphql',
   cache: new InMemoryCache(),
})

if (process.env.NODE_ENV === 'production') {
  apolloClient = new ApolloClient({
    uri: 'https://rego-tau.vercel.app/api/graphql',
    cache: new InMemoryCache(),
  })
} 

export default apolloClient
