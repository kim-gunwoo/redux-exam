import styled from "styled-components";
import Header from "components/todo/Header";
import Main from "components/todo/Main";

export default function StyledTodo() {
  return (
    <Container>
      <Header />
      <Main />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  max-height: 300px;
  background-color: white;
  border: none;
  border-radius: 15px;
`;
