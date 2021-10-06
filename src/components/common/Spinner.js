import styled from "styled-components";

export default function Spinner({ className }) {
  return <Container className={className} />;
}

const Container = styled.div`
  position: relative;
  width: 30px;
  height: 30px;
  font-size: 10px;
  margin: 0 auto;
  border-radius: 50%;
  background: linear-gradient(to right, black 10%, rgba(0, 0, 0, 0) 42%);
  animation: spin 1.4s infinite linear;
  transform: translateZ(0);

  &:before {
    width: 50%;
    height: 50%;
    background: black;
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
  }
  &:after {
    background: white;
    width: 75%;
    height: 75%;
    border-radius: 50%;
    content: "";
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
