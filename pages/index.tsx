import Head from 'next/head'
import { ButtonPrimary, ButtonSecondary } from '../components/basic/button'

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
          <p>wir sind gerade beim Entwicklen von</p>
          <h1>ReGo - Regionalität to go</h1>
          <p>besuche uns bald wieder</p>
        </div>
        <form className="uk-form">
          <div>
            <label className="uk-form-label">Text</label>
            <div className="uk-inline">
              <span className="uk-form-icon" uk-icon="icon: user"></span>
              <input
                className="uk-input uk-form-danger"
                type="text"
                placeholder="Text"
              />
            </div>
          </div>
          <div>
            <label className="uk-form-label">E-Mail</label>
            <input
              className="uk-input"
              type="email"
              placeholder="E-Mail"
              disabled
            />
          </div>
          <div>
            <label className="uk-form-label">Number</label>
            <input
              className="uk-form-controls uk-input"
              type="number"
              placeholder="10"
            />
          </div>
          <textarea className='uk-textarea uk-form-danger'></textarea>
          <input type="radio" name="test" value="test" className='uk-radio' />
          <input type="radio" name="test" value="test" className='uk-radio' />
          <input type="checkbox" name="test" className='uk-checkbox' />
          <div uk-form-custom="target: true">
            <input type="file" aria-label="Custom controls" />
            <input className="uk-input" type="text" placeholder="Select file" aria-label="Custom controls" />
          </div>
          <ButtonPrimary onClick={() => { alert('funktioniert!') }}>Button</ButtonPrimary>
          <ButtonSecondary disabled={true}>Button</ButtonSecondary>
          <select className='uk-select'>
            <option value="test">Test</option>
            <option value="test">Test</option>
          </select>
        </form>
      </main>
    </>
  )
}

export default Home
