import styled from "styled-components";
import { useQuery } from "react-query";
import {
  ArrowAltCircleLeft,
  ArrowAltCircleRight,
} from "@styled-icons/fa-regular";

interface Movie {
  title: string;
  imageUrl: string;
}

const CarouselContainer = styled.div`
  display: flex;
`;

const MovieContainer = styled.div`
  overflow-y: hidden;
  display: flex;
  flex-gap: 1rem;
`;

const MovieCard = styled.div``;

const MovieCarousel = () => {
  const { isLoading, error, data } = useQuery("repoData", () =>
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&query=batman`
    ).then((res) => res.json())
  );

  if (isLoading) return <p>"Loading..."</p>;
  console.log({ data });

  //if (error) return "An error has occurred: " + error.message;

  return (
    <CarouselContainer>
      <ArrowAltCircleLeft size="200" />
      <MovieContainer></MovieContainer>
      <ArrowAltCircleRight size="200" />
    </CarouselContainer>
  );
};

export default MovieCarousel;
