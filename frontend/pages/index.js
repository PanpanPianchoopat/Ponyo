import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import Button from "../components/Button";

function Home() {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <Head>
        <title>Ponyo</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/assets/Logo.svg" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.h1}>Welcome to Ponyo</h1>
        <img className={styles.img} src="/assets/ponyoName.svg" />
        <Button
          variant="yellow"
          size="large"
          onClick={() => router.push("/search")}
        >
          Go To Website
        </Button>
      </main>
    </div>
  );
}

export default Home;
