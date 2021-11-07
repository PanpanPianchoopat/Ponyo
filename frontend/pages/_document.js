import Document, { Head, Main, NextScript, Html } from "next/document";
// Import styled components ServerStyleSheet
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    // Create an instance of ServerStyleSheet
    const sheet = new ServerStyleSheet();

    // Retrieve styles from components in the page
    const page = renderPage(
      (App) => (props) => sheet.collectStyles(<App {...props} />)
    );

    // Extract the styles as <style> tags
    const styleTags = sheet.getStyleElement();

    // Pass styleTags as a prop
    return { ...page, styleTags };
  }

  render() {
    return (
      <Html>
        <Head />
        {this.props.styleTags}
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
