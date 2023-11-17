import { useParams } from "react-router-dom";
import { useTodo } from "../contexts/todoContext";
import { useState, useEffect } from "react";
import ProgressBar from "../components/ProgressBar";

const TodoDetail = () => {
  const { id } = useParams();
  const { getTodo } = useTodo();
  const [colorLabel, setColorLabel] = useState("#0d99ff");
  const [progress, setProgress] = useState(0);
  const todo = getTodo(id);
  const todoDate = todo.date
    ? new Date(`${todo.date}T${todo.time || "00:00:00"}`)
    : 0;
  const [subtasks, setSubtasks] = useState(todo.subtasks);

  if (!todo) return <div>No todo found</div>;

  useEffect(() => {
    handleColor();
  }, [todo]);

  useEffect(() => {
    const totalCheckedSubtasks = subtasks.filter(
      (subtask) => subtask.isChecked
    ).length;
    setProgress(Math.floor((totalCheckedSubtasks / subtasks.length) * 100));
  }, [subtasks]);

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
    const dayDifference = Math.ceil(
      (todoDate - currentDate) / (1000 * 60 * 60 * 24)
    );
    if (dayDifference == 0) {
      setColorLabel("#ff4034");
    } else if (dayDifference <= 3 && dayDifference > 0) {
      setColorLabel("#fe7e08");
    } else {
      setColorLabel("#0d99ff");
    }
  };

  const handleSubtask = (index) => {
    // Changes current indexed subtask to !isChecked
    setSubtasks(
      [...subtasks].map((s, i) =>
        i === index ? { ...s, isChecked: !s.isChecked } : s
      )
    );
  };

  const repeatTask = () => {
    // Changes current indexed subtask to !isChecked
    setSubtasks([...subtasks].map((s) => ({...s, isChecked: false })));
  }

  return (
    <div>
      <span style={{ backgroundColor: colorLabel }} />
      <p>Task Details</p>
      <p>{todo.todoName}</p>
      {`Due Date: ${todoDate.toLocaleString("en-US", { timeZone: "EST" })}`}
      <br />
      {`Priority: ${getLabelForNumber(todo.priority)}(${todo.priority}/10)`}
      <br />
      {`Complexity: ${getLabelForNumber(todo.complexity)}(${
        todo.complexity
      }/10)`}
      <p>Task Completed: </p>
      <ProgressBar progress={progress} />
      <p>Checklist for subtasks</p>
      <ul>
        {subtasks.map((subtask, index) => (
          <>
            <div
              style={{
                textDecoration: subtask.isChecked ? "line-through" : "",
              }}
            >
              {subtask.text}
              <button
                type="button"
                onClick={(e) => {
                  handleSubtask(index);
                }}
              >
                Check
              </button>
            </div>
            <br />
          </>
        ))}
      </ul>
      <button
        type="button"
        onClick={repeatTask}
      >
        Repeat Task
      </button>
    </div>
  );
};

export default TodoDetail;
