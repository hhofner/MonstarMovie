import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Monstar Movies</title>
        <meta name="description" content="Movies for ones delight." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Monstar Movies</h1>
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
