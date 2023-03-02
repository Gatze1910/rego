import { render, screen, waitFor } from '@testing-library/react'
import MiniView from '../../components/partials/miniView'
import { ApolloProvider } from '@apollo/client'
import apolloClient from '../../lib/apollo'
import '@testing-library/jest-dom/extend-expect'
// we are not sure, seems that our tests are more like integration tests, because our db gets queried as well
test('Mini view of shop gets rendered in loading state', async () => {
  render(
    <ApolloProvider client={apolloClient}>
      <MiniView shopId={3} />
    </ApolloProvider>
  )
  expect(document.querySelector('p')).toHaveTextContent('Loading...')
})

test('Mini view of shop contains button with text Shop besuchen', async () => {
  render(
    <ApolloProvider client={apolloClient}>
      <MiniView shopId={3} />
    </ApolloProvider>
  )
  await waitFor(() => {
    expect(document.querySelector('a')).toHaveTextContent('Shop besuchen')
  })
})

test('Mini view of shop nr 10 contains h3 tag with name of shop nr 10', async () => {
  render(
    <ApolloProvider client={apolloClient}>
      <MiniView shopId={10} />
    </ApolloProvider>
  )
  await waitFor(() => {
    expect(document.querySelector('h3')).toHaveTextContent('REGO')
  })
})