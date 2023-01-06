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
        street
        owner {
          name
        }
      }
    }
  }
`

export default function Data() {
  const { data, loading, error } = useQuery(AllUsersQuery)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Currently there is no production database available..</p>

  return (
    <>
      <main className={styles.main}>
        <div>
          <h1>
            Versuch Daten zu laden via Apollo Client mit Prisma und gql...
          </h1>
          {data.users.map((user: any) => (
            <li key={user.id}>
              <b>{user.name}</b>
              <i> {user.lastname}</i>
              <p>das sind alle Shops von {user.name}</p> <br></br>
              {user.shops.map((shop: any) => (
                <ul key={shop.id}>
                  <b>{shop.name}</b>
                  <i> {shop.street}</i>
                </ul>
              ))}
            </li>
          ))}
        </div>
      </main>
    </>
  )
}
