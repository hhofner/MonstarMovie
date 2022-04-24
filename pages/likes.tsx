import Link from "next/link";
import { GradientH1 } from "../components/gradientHeader";
import { useLocalStorage } from "../hooks/localStorage";
import styled from "styled-components";

const LikedMovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Likes = () => {
  const [likes] = useLocalStorage<number[]>("movies", []);
  return (
    <LikedMovieContainer>
      {likes ? (
        <div></div>
      ) : (
        <p>No likes so far, start by looking for your favorite movies</p>
      )}
    </LikedMovieContainer>
  );
};

export default Likes;
