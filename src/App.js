import StyledTodo from "components/todo";
import FeatTodo from "features/todo";
import styles from "App.module.css";

export default function App() {
  return (
    <div className={styles.App}>
      {/* <StyledTodo /> */}
      <FeatTodo />
    </div>
  );
}
