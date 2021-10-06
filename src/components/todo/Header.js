import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Spinner from "components/common/Spinner";
import { todoInsert } from "store/actions/todo";

export default function Header() {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      dispatch(todoInsert(value));
      setValue("");
      setLoading(false);
    }, 1000);
  };

  const handleInput = (e) => setValue(e.target.value);

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <input autoFocus type="text" onChange={handleInput} value={value} />
        <Warpper>{loading ? <Spinner /> : <button>ADD</button>}</Warpper>
      </form>
    </Container>
  );
}

const Container = styled.header`
  form {
    display: flex;
    gap: 10px;
    padding: 20px;
  }
  input {
    width: 100%;
    border: none;
    border-bottom: 1px solid black;
    outline: none;
  }
  button {
    border: 1px solid black;
    border-radius: 10px;
    background-color: white;
    padding: 10px;
    cursor: pointer;
  }
`;

const Warpper = styled.div`
  display: flex;
  align-items: center;
  width: 40px;
  height: 40px;
`;
