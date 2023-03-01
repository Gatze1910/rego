import { gql, useQuery } from '@apollo/client'
import { News, Product, Recipe, Shop } from '@prisma/client'

const AllUsersQuery = gql`
  query {
    shops {
      name
      news {
        title
        content
      }
      products {
        title
        content
      }
      recipes {
        title
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
            Versuch Daten zu laden via Apollo Client mit Prisma und GraphQL von
            Supabase
          </h1>
          {data.shops.map((shop: any) => (
            <li key={shop.id}>
              <b>{shop.name}</b>
              {shop.news.length > 0 ? (
                <p>das sind alle News von {shop.name}</p>
              ) : (
                <p>dieser Shop hat noch keine News gepostet</p>
              )}
              {shop.news.map((news: News) => (
                <ul key={news.id}>
                  <b>{news.title}:</b>
                  <i> {news.content}</i>
                </ul>
              ))}

              {shop.recipes.length > 0 ? (
                <p>das sind alle Rezepte von {shop.name}</p>
              ) : (
                <p>dieser Shop hat noch keine Rezepte</p>
              )}
              {shop.recipes.map((recipe: Recipe) => (
                <ul key={recipe.id}>
                  <b>{recipe.title}:</b>
                  <i> {recipe.content}</i>
                </ul>
              ))}
              {shop.products.length > 0 ? (
                <p>das sind alle Produkte von {shop.name}</p>
              ) : (
                <p>dieser Shop hat noch keine Produkte </p>
              )}
              {shop.products.map((product: Product) => (
                <ul key={product.id}>
                  <b>{product.title}:</b>
                  <i> {product.content}</i>
                </ul>
              ))}
            </li>
          ))}
        </div>
      </main>
    </>
  )
}
