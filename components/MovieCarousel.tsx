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
import { getMoviePath } from "../lib/helpers";

type Movie = {
  id: number;
  imageUrl: string;
};

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
  overflow: hidden;
`;

const LeftArrow = styled(ArrowAltCircleLeft)`
  cursor: pointer;
`;
const RightArrow = styled(ArrowAltCircleRight)`
  cursor: pointer;
`;
const LikeButton = styled(Heart)<{ liked: boolean }>`
  cursor: pointer;
  ${(props) => props.liked && "color: red;"}
  transition: color 300ms ease-out;
`;

const MovieCard = styled.div<{
  rotation: string;
  translation: string;
  isFocused: boolean;
}>`
  width: 140px;
  position: relative;
  transition: transform 300ms ease;
  transform: ${(props) =>
    ` translateX(${props.translation})
 rotateY(${props.rotation}) ${props.isFocused ? "scale(1.2)" : "scale(1.0)"} 
    `};

  ${(props) => props.isFocused && "cursor: pointer; z-index: 5"}
  ${(props) => !props.isFocused && "opacity: 0.65"}
`;

const MovieCarousel = ({ searchItem }: { searchItem: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedMovies, setLikedMovies] = useLocalStorage<Movie[]>("movies", []);
  const router = useRouter();

  const handleRight = () => {
    if (!data.results) return;
    if (currentIndex < data.results.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  const handleLeft = () => {
    if (!data.results) return;
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  const handleLike = (movieId: number, movieUrl: string) => {
    if (!likedMovies.some((movie: Movie) => movie.id === movieId)) {
      setLikedMovies([...likedMovies, { id: movieId, imageUrl: movieUrl }]);
    } else {
      setLikedMovies([
        ...likedMovies.filter((movie: Movie) => movie.id !== movieId),
      ]);
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
    return currentIndex * -110;
  };

  const handleMovieCardClick = (movieIndex: number, movieId: number) => {
    console.log({ movieIndex });
    console.log({ movieId });
    if (movieIndex !== currentIndex) {
      setCurrentIndex(movieIndex);
    } else {
      router.push(`${movieId}`);
    }
  };

  const { isLoading, error, data } = useQuery(["movieData", searchItem], () =>
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=9d8745c4222208d2b3ffebd6d928ad1f&query=${searchItem}`
    ).then((res) => res.json())
  );

  if (isLoading) return <p>Loading</p>;

  if (error) return <p>An error has occurred</p>;

  return (
    <div>
      {/* TODO: Handle images that are not rectangle up*/}
      {/* TODO: Handle no data */}
      <MovieContainer>
        {data.results ? (
          data.results.map((movie: any, index: number) => (
            <MovieCard
              key={movie.title + `${index}`}
              isFocused={index === currentIndex}
              rotation={`${calculateRotation(currentIndex, index)}deg`}
              translation={`${calculateTranslation(currentIndex, index)}px`}
              onClick={() => handleMovieCardClick(index, movie.id)}
            >
              <Image
                src={getMoviePath(movie.backdrop_path)}
                width={140}
                height={200}
                layout={"fixed"}
              />
              {movie.title}
            </MovieCard>
          ))
        ) : (
          <div>Could not find any results</div>
        )}
      </MovieContainer>
      <Controls>
        <LeftArrow size="40" onClick={handleLeft} />
        <LikeButton
          size="40"
          onClick={() =>
            data.results &&
            handleLike(
              data.results[currentIndex].id,
              data.results[currentIndex].backdrop_path
            )
          }
          liked={
            data.results
              ? likedMovies.some(
                  (movie: Movie) => movie.id === data.results[currentIndex].id
                )
              : false
          }
        />
        <RightArrow size="40" onClick={handleRight} />
      </Controls>
    </div>
  );
};

export default MovieCarousel;
