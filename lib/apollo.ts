import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import fetch from 'cross-fetch';

if (process.env.NODE_ENV === 'production') {
  var apolloClient = new ApolloClient({
    uri: 'https://rego-tau.vercel.app/api/graphql',
    cache: new InMemoryCache(),
  })
} else {
  var apolloClient = new ApolloClient({
    link: new HttpLink({ uri: 'http://localhost:3000/api/graphql', fetch }),
    cache: new InMemoryCache(),
  })
}

export default apolloClient
