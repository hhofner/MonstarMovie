import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useQuery } from "react-query";
import {
  ArrowAltCircleLeft,
  ArrowAltCircleRight,
  Heart,
} from "@styled-icons/fa-regular";
import { useLocalStorage } from "../hooks/localStorage";
import { useState } from "react";

interface Movie {
  title: string;
  imageUrl: string;
}

const Controls = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;

const MovieContainer = styled.div`
  overflow-x: hidden;
  display: flex;
  transform-style: preserve-3d;
  perspective: 900px;
  padding: 3rem;
`;

const LeftArrow = styled(ArrowAltCircleLeft)`
  cursor: pointer;
`;
const RightArrow = styled(ArrowAltCircleRight)`
  cursor: pointer;
`;
const LikeButton = styled(Heart)`
  cursor: pointer;
`;

const MovieCard = styled.div<{
  rotation: string;
  translation: string;
  isFocused: boolean;
}>`
  position: relative;
  transition: transform 300ms ease;
  transform: ${(props) =>
    `rotateY(${props.rotation}) translateX(${props.translation})
    scale(1.0) 
    `};

  border: 2px solid black;
  border-radius: 15px;
  ${(props) => props.isFocused && "cursor: pointer"}
`;

const MovieCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedMovies, setLikedMovies] = useLocalStorage<number[]>("movies", []);
  console.log({ likedMovies });
  const router = useRouter();

  const base = "https://image.tmdb.org/t/p/";
  const size = "original/";
  const baseTranslation = 70;
  const translationMultiplier = 1.5;

  const handleRight = () => setCurrentIndex(currentIndex + 1);
  const handleLeft = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  const handleLike = (movieId: number) => {
    if (!likedMovies.includes(movieId)) {
      setLikedMovies([...likedMovies, movieId]);
    } else {
      setLikedMovies([...likedMovies.filter((id: number) => id !== movieId)]);
    }
  };

  const calculateRotation = (currentIndex: number, indexOfMovie: number) => {
    const baseRotation = 45;
    if (currentIndex !== indexOfMovie) {
      return (
        Math.sign(currentIndex - indexOfMovie) * baseRotation +
        (indexOfMovie - currentIndex) / 100
      );
    }

    return 0;
  };

  const calculateTranslation = (currentIndex: number, indexOfMovie: number) => {
    return currentIndex * 70;
  };

  const handleMovieCardClick = (movieIndex: number, movieId: number) => {
    if (movieIndex !== movieIndex) {
      setCurrentIndex(movieIndex);
    } else {
      router.push(`${movieId}`);
    }
  };

  const { isLoading, error, data } = useQuery("repoData", () =>
    //TODO: Do something about API key
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=9d8745c4222208d2b3ffebd6d928ad1f&query=batman`
    ).then((res) => res.json())
  );

  if (isLoading) return <p>"Loading..."</p>;

  if (error) return <p>"An error has occurred: "</p>;
  console.log(data);

  return (
    <div>
      {/* TODO: Handle images that are not rectangle up*/}
      {/* TODO: Handle no data */}
      <MovieContainer>
        {data.results.map((movie: any, index: number) => (
          <MovieCard
            key={movie.title + `${index}`}
            isFocused={index === currentIndex}
            rotation={`${calculateRotation(currentIndex, index)}deg`}
            translation={"0"}
            onClick={() => handleMovieCardClick(index, movie.id)}
          >
            <Image
              src={base + size + movie.backdrop_path || "noimage.svg"}
              width={140}
              height={200}
              layout={"fixed"}
            />
            {movie.title}
          </MovieCard>
        ))}
      </MovieContainer>
      <Controls>
        <LeftArrow size="40" onClick={handleLeft} />
        {/* TODO: Handle possible no data */}
        <LikeButton
          size="40"
          onClick={() => handleLike(data.results[currentIndex].id)}
        />
        <RightArrow size="40" onClick={handleRight} />
      </Controls>
    </div>
  );
};

export default MovieCarousel;
