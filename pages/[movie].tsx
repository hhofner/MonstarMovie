import { GetServerSideProps } from "next";
import { useQuery } from "react-query";

// Details page for movie

const MoviePage = (props: any) => {
  console.log({ props });
  if (props.notFound) {
    return <div>Movie data could not be found</div>;
  } else {
    return <div>Data found!</div>;
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
