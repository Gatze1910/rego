import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { gql, useQuery } from '@apollo/client'

const AllUsersQuery = gql`
  query {
    users {
      id
      name
      lastname
      shops {
        id
        name
      }
    }
  }
`

export default function Data() {
  const { data, loading, error } = useQuery(AllUsersQuery)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Oh no... {error.message}</p>

  return (
    <>
      <main className={styles.main}>
        <div>
          <h1>Versuch Daten zu laden via Apollo Client mit Prisma und gql...</h1>
          {data.users.map( user => (
            <li key={user.id}>
              <b>{user.name}</b>
              <p>{user.lastname}</p>
              <p>{user.shops.map( shop => (
                <li key={shop.id}>
                  <i>{shop.name}</i>
                </li>
              ))}</p>
            </li>
          ))}
        </div>
      </main>
    </>
  )
}
