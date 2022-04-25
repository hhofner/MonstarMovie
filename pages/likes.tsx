import Link from "next/link";
import Image from "next/image";
import { GradientH1 } from "../components/gradientHeader";
import { getMoviePath } from "../lib/helpers";
import { useLocalStorage } from "../hooks/localStorage";
import styled from "styled-components";
import { HandPointLeft } from "@styled-icons/fa-regular";

type Movie = {
  id: number;
  imageUrl: string;
};
const LikedMovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Header = styled.a`
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const Likes = () => {
  const [likes] = useLocalStorage<Movie[]>("movies", []);
  return (
    <>
      <Link href="/">
        <Header>
          <HandPointLeft size="40" />
          <span>Return to search</span>
        </Header>
      </Link>

      <LikedMovieContainer>
        <GradientH1>My Movies</GradientH1>
        {likes ? (
          <div>
            {likes.map((movie: Movie, index: number) => (
              <div key={movie.id + index}>
                <Link href={`/${movie.id}`}>
                  <a>
                    <Image
                      src={getMoviePath(movie.imageUrl)}
                      width={140}
                      height={200}
                      layout={"fixed"}
                    />
                  </a>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p>No likes so far, start by looking for your favorite movies</p>
        )}
      </LikedMovieContainer>
    </>
  );
};

export default Likes;
