import { useParams } from "react-router-dom";
import { useTodo } from "../contexts/todoContext";
import { useState, useEffect } from "react";
import ProgressBar from "../components/ProgressBar"


const TodoDetail = () => {
  const { id } = useParams();
  const { getTodo } = useTodo();
  const [colorLabel, setColorLabel] = useState("#0d99ff");
  const [progress, setProgress] = useState(0);
  const todo = getTodo(id);
  const todoDate = todo.dueDate ? new Date(todo.dueDate) : 0;


  if (!todo) return <div>No todo found</div>;

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
    const currentDate = new Date();
    const dayDifference = Math.ceil((todoDate - currentDate) / (1000 * 60 * 60 * 24));
    if (dayDifference == 0) {
      setColorLabel("#ff4034")
    }
    else if (dayDifference <= 3) {
      setColorLabel("#fe7e08")
    }
    else {
      setColorLabel("#0d99ff")
    }
  }

  const handleSubtask = () => {
    setProgress(15);
    console.log(progress);
  }

  return (
    <div>
      <span style={{backgroundColor: colorLabel}}/>
      <p>Task Details</p>
      <p>{todo.todoName}</p>
      <div>
        {`Due Date: ${todoDate.toLocaleString('en-US', { timeZone: 'EST'})}`}
        <br />
        {`Priority: ${getLabelForNumber(todo.priority)}(${todo.priority}/10)`}
        <br />
        {`Complexity: ${getLabelForNumber(todo.complexity)}(${todo.complexity}/10)`}
        <p>Task Completed: </p>
        <ProgressBar progress={progress}/>
        <p>Checklist for subtasks</p>
        <ul>
          {todo.subtasks.map((subtask) => (
            <>
              <div style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}>
                {subtask}
                <button type="button" onClick={() => {}}>
                  Check
                </button>
              </div>
              <br/>
            </>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoDetail;
