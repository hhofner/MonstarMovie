import Link from "next/link";
import type { NextPage } from "next";
import Head from "next/head";
import { GradientH1, GradientH5 } from "../components/gradientHeader";
import styled from "styled-components";
import MovieCarousel from "../components/MovieCarousel";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Monstar Movies</title>
        <meta name="description" content="Movies for ones delight." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header>
          <GradientH1>Monstar Movies</GradientH1>
          <Link href="likes">
            <GradientH5>My Movies</GradientH5>
          </Link>
        </Header>
        <MovieCarousel />
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
