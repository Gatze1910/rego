import 'uikit/dist/css/uikit.min.css'
import Uikit from 'uikit/dist/js/uikit'
import Icons from 'uikit/dist/js/uikit-icons'
import '../assets/styles/style.scss'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import apolloClient from '../lib/apollo'
import { AuthContextProvider } from '../context/AuthContext'
import { Header } from '../components/partials/header'
import { Footer } from '../components/partials/footer'

const App = ({ Component, pageProps }: AppProps) => {
  Uikit.use(Icons)

  return (
    <ApolloProvider client={apolloClient}>
      <AuthContextProvider>
        <Header />
        <div className="uk-container uk-container-large">
          <Component className="uk-padding uk-padding-remove-vertical" {...pageProps} />
        </div>
        <Footer />
      </AuthContextProvider>
    </ApolloProvider>
  )
}

export default App
