import { Link } from "react-router-dom";
import { useTodo } from "../contexts/todoContext";

function Todo({ todo }) {
  const { completeTodo, removeTodo } = useTodo();
  return (
    <div
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      <Link to={`/todo/${todo.id}`}>{todo.todoName}</Link>
      <div>
        <button onClick={() => completeTodo(todo)}>Complete</button>
        <button onClick={() => removeTodo(todo)}>x</button>
      </div>
    </div>
  );
}

export default Todo;
