import "../styles/globals.css";
import "antd/dist/antd.css";
import Navbar from "./components/Navbar";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
