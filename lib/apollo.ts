import { ApolloClient, InMemoryCache } from '@apollo/client'

import fetch from 'cross-fetch';
import {  HttpLink } from '@apollo/client';




const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:3000/api/graphql', fetch }),
  cache: new InMemoryCache(),
})

export default apolloClient
