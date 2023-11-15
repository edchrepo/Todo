import { Link } from "react-router-dom";
import { useTodo } from "../contexts/todoContext";
import { useNavigate } from "react-router-dom"

function Todo({ todo }) {
  const { completeTodo, removeTodo } = useTodo();
  const navigate = useNavigate();

  return (
    <div
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      <Link to={`/todo/${todo.id}`}>{todo.todoName}</Link>
      <div>
        <button onClick={() => completeTodo(todo)}>Complete</button>
        <button onClick={() => removeTodo(todo)}>x</button>
        <button onClick={() => navigate(`/editTask/${todo.id}`)}>Edit</button>
      </div>
    </div>
  );
}

export default Todo;
