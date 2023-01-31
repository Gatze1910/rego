import '../assets/styles/style.scss'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import apolloClient from '../lib/apollo'
import { AuthContextProvider } from '../context/AuthContext'
import Navbar from '../components/partials/navbar'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthContextProvider>
        <Navbar>
          <Component {...pageProps} />
        </Navbar>
      </AuthContextProvider>
    </ApolloProvider>
  )
}

export default App
