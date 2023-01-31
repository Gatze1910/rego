import { Html, Head, Main, NextScript } from 'next/document'

export const Document = () => {
  return (
    <Html lang="de">
      <Head />
      <body className="uk-padding uk-padding-remove-vertical">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
