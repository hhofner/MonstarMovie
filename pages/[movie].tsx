import Image from "next/image";
import { GetServerSideProps } from "next";
import styled from "styled-components";
import { getMoviePath } from "../lib/helpers";
import { GradientH1 } from "../components/gradientHeader";
import Link from "next/link";

// Details page for movie
const MovieDetailContainer = styled.div`
  display: flex;
  gap: 4rem;
`;

const MovieImage = styled.div`
  flex-grow: 5;
`;

const TextDetails = styled.div``;

const MinorDetails = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MoviePage = (props: any) => {
  console.log({ props });
  if (props.notFound) {
    return <div>Movie data could not be found</div>;
  } else {
    return (
      <MovieDetailContainer>
        <MovieImage>
          <Image
            src={getMoviePath(props.movieDetails.backdrop_path)}
            width={420}
            height={600}
            layout={"fixed"}
          />
        </MovieImage>
        <TextDetails>
          <GradientH1>{props.movieDetails.original_title}</GradientH1>
          <MinorDetails>
            <small>{props.movieDetails.release_date}</small>
            <small>${props.movieDetails.revenue}</small>
          </MinorDetails>
          <p>{props.movieDetails.overview}</p>
        </TextDetails>
      </MovieDetailContainer>
    );
  }
};

export default MoviePage;
export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.params) {
    const movieDetails = await fetch(
      `https://api.themoviedb.org/3/movie/${
        context.params.movie
      }?api_key=${"9d8745c4222208d2b3ffebd6d928ad1f"}`
    ).then((response) => response.json());

    if (movieDetails) {
      return {
        props: { movieDetails },
      };
    }
  }

  return {
    notFound: true,
  };
};
