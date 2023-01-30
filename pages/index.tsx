import Head from 'next/head'

export const Home = () => {
  return (
    <>
      <Head>
        <title>ReGo</title>
        <meta
          name="description"
          content="MMP3 - FH Salzburg - ReGo - Bernadette Ackerl, Vanessa Reiter und Markus Rinnerberger"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <div>
            <p>Bernadette Ackerl, Vanessa Reiter und Markus Rinnerberger</p>
          </div>
        </div>

        <div>
          <p>wir sind gerade beim Entwicklen von</p>
          <h1>ReGo - Regionalität to go</h1>
          <p>besuche uns bald wieder</p>
        </div>
      </main>
    </>
  )
}

export default Home
