import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTodo } from "../contexts/todoContext";
import { useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar";
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
    const todoDate = todo.date
      ? new Date(`${todo.date}T${todo.time || "00:00:00"}`)
      : 0;
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

  return (
    <div
      className="bg-white border p-2.5 border-solid border-[#ccc] rounded-lg mb-5"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
      onClick={() => navigate(`/todo/${todo.id}`)}
    >
      <div className="flex items-center">
        <span
          className="h-[15px] w-[15px] inline-block rounded-[50%]"
          style={{ backgroundColor: colorLabel }}
        />
        {/* <Link to={`/todo/${todo.id}`}>{todo.todoName}</Link> */}
        <span className="font-bold ml-1">{todo.todoName}</span>
        <div className="grow" />
        <div className="space-x-2">
          <button
            className="bg-blue-200 rounded-[50%] h-[32px] w-[32px]"
            onClick={(e) => {
              e.stopPropagation();
              completeTodo(todo);
            }}
          >
            ✓
          </button>
          <button
            className="bg-blue-200 rounded-[50%] h-[32px] w-[32px]"
            onClick={(e) => {
              e.stopPropagation();
              removeTodo(todo);
              navigate("/");
            }}
          >
            ×
          </button>
          <button
            className="bg-blue-200 rounded-[50%] h-[32px] w-[32px]"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/editTask/${todo.id}`);
            }}
          >
            ✎
          </button>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <div>
          <span className="inline-block w-[24px]">📅</span>
          <span className="text-[#b2aeae]">Due Date: </span>
          <span style={{ color: colorLabel }}>{todoDate.toLocaleString("en-US", { timeZone: "EST" })}</span>
        </div>
        <div>
          <span className="inline-block w-[24px]">↑</span>
          <span className="text-[#b2aeae]">Priority: </span>
          <span>{`${getLabelForNumber(todo.priority)}(${todo.priority}/10)`}</span>
        </div>
        <div>
          <span className="inline-block w-[24px]">↔</span>
          <span className="text-[#b2aeae]">Complexity: </span>
          <span>{`${getLabelForNumber(todo.complexity)}(${todo.complexity}/10)`}</span>
        </div>
        <p>Task Completed: </p>
        <ProgressBar
          progress={
            Math.floor(
              (todo.subtasks.filter((subtask) => subtask.isChecked).length /
                todo.subtasks.length) *
                100
            ) || 0
          }
        />
        {todo.tags && todo.tags.split(",").map((tag, index) =>
          <span className="pt-2 pb-1" key={index}>
            <span className="bg-blue-200 rounded-full p-2">{tag}</span>
          </span>
        )}
      </div>
    </div>
  );
}

export default Todo;
