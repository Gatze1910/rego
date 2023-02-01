import { gql, useQuery } from '@apollo/client'

const AllUsersQuery = gql`
  query {
    shops {
      name
      news {
        content
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
      <main>
        <div>
          <h1>
            Versuch Daten zu laden via Apollo Client mit Prisma und GraphQL von Supabase
          </h1>
          {data.shops.map((shop: any) => (
            <li key={shop.id}>
              <b>{shop.name}</b>
              <p>das sind alle News von {shop.name}</p> <br></br>
              {shop.news.map((news: any) => (
                <ul key={news.id}>
                  <b>{news.title}</b>
                  <i> {news.content}</i>
                </ul>
              ))}
            </li>
          ))}
        </div>
      </main>
    </>
  )
}
