import styled, { keyframes } from "styled-components";

const moveBackground = keyframes`
  to {
    background-position: 400% 0;
  }
`;

const Background = styled.div`
  background: hsl(0 0% 20%);
`;

const Header = styled.h1<{ changeTheme?: boolean }>`
  margin: 0;
  --color-one: hsl(15 90% 55%);
  --color-two: hsl(40 95% 55%);
  ${(props) =>
    props.changeTheme &&
    "--color-one: hsl(108, 68%, 47%); --color-two: hsl(238, 68%, 47%)"}
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

const Header5 = styled.h5`
  margin: 0;
  --color-one: hsl(211, 87%, 55%);
  --color-two: hsl(172, 68%, 47%);
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
  cursor: pointer;
`;

export const GradientH1 = (props: any) => <Header>{props.children}</Header>;
export const GradientH5 = (props: any) => <Header5>{props.children}</Header5>;
