import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTodo } from "../contexts/todoContext";
import { useNavigate } from "react-router-dom"
import ProgressBar from "./ProgressBar"
import "../styles.css";

function Todo({ todo }) {
  const { completeTodo, removeTodo } = useTodo();
  const [colorLabel, setColorLabel] = useState("#0d99ff");
  const navigate = useNavigate();

  useEffect(() => {
    handleColor();
  }, [todo]);

  const handleColor = () => {
    const todoDate = todo.date ? new Date(`${todo.date}T${todo.time || '00:00:00'}`) : 0;
    const currentDate = new Date();
    const dayDifference = Math.ceil((todoDate - currentDate) / (1000 * 60 * 60 * 24));
    if (dayDifference == 0) {
      setColorLabel("#ff4034")
    }
    else if (dayDifference <= 3 && dayDifference > 0) {
      setColorLabel("#fe7e08")
    }
    else {
      setColorLabel("#0d99ff")
    }
  }

  return (
    <div
      className="todo"
      style={{ width: "33%", textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      <span style={{backgroundColor: colorLabel}}/>
      <Link to={`/todo/${todo.id}`}>{todo.todoName}</Link>
      <div>
        <button onClick={() => completeTodo(todo)}>Complete</button>
        <button onClick={() => removeTodo(todo)}>x</button>
        <button onClick={() => navigate(`/editTask/${todo.id}`)}>Edit</button>
      </div>
      <ProgressBar progress={50}/>
    </div>
  );
}

export default Todo;

