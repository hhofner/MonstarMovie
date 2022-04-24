import styled, { keyframes } from "styled-components";

const moveBackground = keyframes`
  to {
    background-position: 400% 0;
  }
`;

const Background = styled.div`
  background: hsl(0 0% 20%);
`;

const Header = styled.h1`
  margin: 0;
  --color-one: hsl(15 90% 55%);
  --color-two: hsl(40 95% 55%);
  background: linear-gradient(
      90deg,
      var(--color-one),
      var(--color-two),
      var(--color-one)
    )
    0 0 / 400% 100%;
  animation: ${moveBackground} 8s infinite linear;
  color: transparent;
  background-clip: text;
`;

const Header2 = styled.h2`
  margin: 0;
  --color-one: hsl(15 90% 55%);
  --color-two: hsl(40 95% 55%);
  background: linear-gradient(
      90deg,
      var(--color-one),
      var(--color-two),
      var(--color-one)
    )
    0 0 / 400% 100%;
  animation: ${moveBackground} 8s infinite linear;
  color: transparent;
  background-clip: text;
`;

export const GradientH1 = (props: any) => <Header>{props.children}</Header>;
export const GradientH2 = (props: any) => <Header2>{props.children}</Header2>;
