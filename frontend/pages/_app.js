import { Provider as ReduxProvider } from "react-redux";
import store from "../store";
import "../styles/globals.css";
import "antd/dist/antd.css";
import Navbar from "./components/Navbar";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <ReduxProvider store={store}>
        <Navbar />
        <Component {...pageProps} />
      </ReduxProvider>
    </>
  );
};

export default App;
