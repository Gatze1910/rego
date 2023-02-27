import 'uikit/dist/css/uikit.min.css'
import Uikit from 'uikit/dist/js/uikit'
import Icons from 'uikit/dist/js/uikit-icons'
import '../assets/styles/style.scss'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import apolloClient from '../lib/apollo'
import { Header } from '../components/partials/header'
import { Footer } from '../components/partials/footer'
import { UserProvider } from '@auth0/nextjs-auth0/client'

const App = ({ Component, pageProps }: AppProps) => {
  Uikit.use(Icons)

  return (
    <UserProvider>
      <ApolloProvider client={apolloClient}>
        <Header />
        <div className="body-wrapper">
          <Component
            className="uk-padding- uk-padding-remove-vertical"
            {...pageProps}
          />
        </div>
        <Footer />
      </ApolloProvider>
    </UserProvider>
  )
}

export default App
