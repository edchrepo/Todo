import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTodo } from "../contexts/todoContext";
import { useNavigate } from "react-router-dom"
import ProgressBar from "./ProgressBar"
import "../styles.css";

function Todo({ todo }) {
  const { completeTodo, removeTodo } = useTodo();
  const [colorLabel, setColorLabel] = useState("#0d99ff");
  const todoDate = todo.date
  ? new Date(`${todo.date}T${todo.time || "00:00:00"}`)
  : 0;
  const navigate = useNavigate();

  useEffect(() => {
    handleColor();
  }, [todo]);

  function getLabelForNumber(number) {
    if (number >= 1 && number <= 3) {
      return "Low";
    } else if (number >= 4 && number <= 7) {
      return "Medium";
    } else if (number >= 8 && number <= 10) {
      return "High";
    } else {
      return "";
    }
  }

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
    <div className="todo" style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}>
      <div className="todoTop">
        <span style={{backgroundColor: colorLabel}}/>
        <Link to={`/todo/${todo.id}`}>{todo.todoName}</Link>
        <div className="grow"/>
        <div>
          <button onClick={() => completeTodo(todo)}>Complete</button>
          <button onClick={() => {removeTodo(todo) 
                                  navigate('/')}}>x</button>
          <button onClick={() => navigate(`/editTask/${todo.id}`)}>Edit</button>
        </div>
      </div>
      <br />
      {`Due Date: ${todoDate.toLocaleString("en-US", { timeZone: "EST" })}`}
      <br />
      {`Priority: ${getLabelForNumber(todo.priority)}(${todo.priority}/10)`}
      <br />
      {`Complexity: ${getLabelForNumber(todo.complexity)}(${todo.complexity}/10)`}
      <p>Task Completed: </p>
      <ProgressBar progress={Math.floor((todo.subtasks.filter((subtask) => subtask.isChecked
        ).length / todo.subtasks.length) * 100) || 0} />
    </div>
  );
}

export default Todo;

