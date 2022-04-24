import type { NextPage } from "next";
import Head from "next/head";
import { GradientH1 } from "../components/gradientHeader";
import MovieCarousel from "../components/MovieCarousel";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Monstar Movies</title>
        <meta name="description" content="Movies for ones delight." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <GradientH1>Monstar Movies</GradientH1>
        <MovieCarousel />
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
