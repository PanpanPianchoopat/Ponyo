import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Navbar from "./components/Navbar";
import AddRestaurant from "./AddRestaurant";
import RestCard from "./components/Card";
import { SAMPLE_DATA } from "./components/Card/constant";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ponyo</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <main className={styles.main}>
        {/* <AddRestaurant /> */}
        <div style={{ display: "flex" }}>
          {/* <RestCard liked={true} saved={false} />
          <RestCard liked={false} saved={true} />
          <RestCard liked={false} saved={false} /> */}
          {SAMPLE_DATA.map((item) => (
            <RestCard detail={item} liked={item.liked} saved={item.saved} />
          ))}
        </div>
      </main>
    </div>
  );
}
