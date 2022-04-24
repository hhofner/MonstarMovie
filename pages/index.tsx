import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { GradientH1, GradientH5 } from "../components/gradientHeader";
import styled from "styled-components";
import MovieCarousel from "../components/MovieCarousel";
import SearchBar from "../components/SearchBar";
import { useDebounce } from "../hooks/useDebounce";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Home: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const searchItem = useDebounce(searchTerm, 300);
  const router = useRouter();
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
            <a>
              <GradientH5 onClick={() => router.push("/likes")}>
                My Movies
              </GradientH5>
            </a>
          </Link>
        </Header>
        <SearchBar onInputChange={(s: string) => setSearchTerm(s)} />
        <MovieCarousel searchItem={searchItem} />
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
