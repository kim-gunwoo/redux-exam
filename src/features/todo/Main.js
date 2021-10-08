import { useState } from "react";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import Item from "features/todo/Item";
import Spinner from "components/common/Spinner";

export default function Main() {
  const { todos } = useSelector((state) => state.todo);
  const [loading, setLoading] = useState(false);

  return (
    <Container loading={loading ? 1 : 0}>
      {loading && (
        <Wrapper>
          <StyleSpinner />
        </Wrapper>
      )}
      <ul>
        {todos.map((todo) => (
          <Item key={todo.id} todo={todo} setLoading={setLoading} />
        ))}
      </ul>
    </Container>
  );
}

const Container = styled.main`
  padding: 10px 0;
  height: 200px;
  overflow: auto;

  ${({ loading }) => {
    return (
      loading &&
      css`
        overflow: hidden;
        ul {
          opacity: 0.4;
          &: disabled;
        }
      `
    );
  }};
`;

const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  padding: 5px;
  background-color: white;
`;

const StyleSpinner = styled(Spinner)`
  width: 40px;
  height: 40px;
`;
