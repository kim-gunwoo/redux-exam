import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { todoUpdate, todoToggle, todoRemove } from "store/actions/todo";
import { ReactComponent as Check } from "assets/icons/check.svg";
import { ReactComponent as Delete } from "assets/icons/delete.svg";
import { ReactComponent as Save } from "assets/icons/save.svg";

export default function Item({ todo, setLoading }) {
  const [isModify, setIsModify] = useState(false);
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const handleInput = (e) => setValue(e.target.value);

  const handleIsModify = () => {
    setIsModify(true);
    setValue(todo.text);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      dispatch(todoUpdate(todo.id, value));
      setIsModify(false);
      setLoading(false);
    }, 1000);
  };

  const handleToggle = () => {
    setLoading(true);
    setTimeout(() => {
      dispatch(todoToggle(todo.id));
      setLoading(false);
    }, 1000);
  };
  const handleDelete = () => {
    setLoading(true);
    setTimeout(() => {
      dispatch(todoRemove(todo.id));
      setLoading(false);
    }, 1000);
  };

  const handleBlur = () => setIsModify(false);

  return (
    <Container>
      <CheckCircle onClick={handleToggle}>{todo.done && <Check />}</CheckCircle>
      {isModify ? (
        <form onSubmit={handleSubmit} onBlur={handleBlur}>
          <input autoFocus type="text" onChange={handleInput} value={value} />
          <Button onMouseDown={handleSubmit}>
            <Save />
          </Button>
        </form>
      ) : (
        <>
          <Text onClick={handleIsModify}>{todo.text}</Text>
          <Button onClick={handleDelete}>
            <Delete />
          </Button>
        </>
      )}
    </Container>
  );
}

const Container = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;

  form {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;

    input {
      width: 100%;
      border: none;
      border-bottom: 1px solid black;
      outline: none;
    }
  }
`;

const CheckCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 16px;
  border: 1px solid gray;
  cursor: pointer;
`;

const Button = styled.button`
  border: none;
  background-color: transparent;
  fill: gray;
  cursor: pointer;

  &:hover {
    fill: black;
  }
`;

const Text = styled.div`
  flex: 1;
`;
