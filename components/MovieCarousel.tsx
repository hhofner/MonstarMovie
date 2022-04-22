import Image from "next/image";
import styled from "styled-components";
import { useQuery } from "react-query";
import {
  ArrowAltCircleLeft,
  ArrowAltCircleRight,
} from "@styled-icons/fa-regular";
import { useState } from "react";

interface Movie {
  title: string;
  imageUrl: string;
}

const Controls = styled.div`
  display: flex;
`;

const MovieContainer = styled.div`
  overflow-x: scroll;
  display: flex;
  transform-style: preserve-3d;
  perspective: 900px;
  padding: 3rem;
`;

const MovieCard = styled.div<{
  rotation: string;
  translation: string;
}>`
  position: relative;
  transition: transform 300ms ease;
  transform: ${(props) =>
    `rotateY(${props.rotation}) translateX(${props.translation})
    scale(1.0) 
    `};

  border: 2px solid black;
  border-radius: 15px;
`;

const MovieCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

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
    if (Math.abs(currentIndex - indexOfMovie) > 0) {
      return 70;
    }
    return 1 + (currentIndex - indexOfMovie) / 100;
  };

  const { isLoading, error, data } = useQuery("repoData", () =>
    //TODO: Do something about API key
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=9d8745c4222208d2b3ffebd6d928ad1f&query=batman`
    ).then((res) => res.json())
  );

  if (isLoading) return <p>"Loading..."</p>;

  if (error) return "An error has occurred: ";

  return (
    <div>
      {/* TODO: Handle images that are not rectangle up*/}
      {/* TODO: Handle no data */}
      <MovieContainer>
        {data.results.map((movie: any, index: number) => (
          <MovieCard
            key={movie.title}
            rotation={`${calculateRotation(currentIndex, index)}deg`}
            translation={`${calculateTranslation(currentIndex, index)}%`}
          >
            <Image
              src={base + size + movie.backdrop_path || "noimage.svg"}
              width={140}
              height={200}
              layout={"fixed"}
            />
            {/* {movie.title} */}
          </MovieCard>
        ))}
      </MovieContainer>
      <Controls>
        <ArrowAltCircleLeft size="40" onClick={handleLeft} />
        <ArrowAltCircleRight size="40" onClick={handleRight} />
      </Controls>
    </div>
  );
};

export default MovieCarousel;
