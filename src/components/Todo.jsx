import { useState, useEffect } from "react";
import { useTodo } from "../context/todoContext";
import { useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar";
import {
  PriorityIcon,
  ComplexityIcon,
  CalendarIcon,
  RemoveIcon,
  EditIcon,
  CheckIcon,
} from "../icons";
import "../styles.css";

function Todo({ todo }) {
  const { completeTodo, removeTodo } = useTodo();
  const [colorLabel, setColorLabel] = useState("#0d99ff");
  const todoDate = todo.date
    ? new Date(`${todo.date}T${todo.time || "23:59:00"}`)
    : "Not Specified";
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
      className={`${todo.isCompleted ? "bg-blue-50 border-[#0d99ff]" : "bg-white"} 
                border p-2.5 border-solid border-[#ccc] rounded-lg mb-5 hover:cursor-pointer hover:border-[#0d99ff]`}
      onClick={() => navigate(`/todo/${todo.id}`)}
    >
      <div className="flex items-center">
        <span
          className="h-[15px] w-[15px] inline-block rounded-[50%]"
          style={{ backgroundColor: colorLabel }}
        />
        <span className="font-bold ml-1">{todo.todoName}</span>
        <div className="grow" />
        <div className="space-x-2 flex">
          <button
            className={`${todo.isCompleted ? "bg-[#0d99ff]" : "bg-blue-200"} 
                      rounded-[50%] h-[32px] w-[32px] hover:bg-blue-400 flex items-center justify-center`}
            onClick={(e) => {
              e.stopPropagation();
              completeTodo(todo);
            }}
          >
            <img className="h-[16px] w-[16px]" src={CheckIcon} />
          </button>
          <button
            className="bg-blue-200 rounded-[50%] h-[32px] w-[32px] hover:bg-blue-400 flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              removeTodo(todo);
              navigate("/");
            }}
          >
            <img className="h-[16px] w-[16px]" src={RemoveIcon} />
          </button>
          <button
            className="bg-blue-200 rounded-[50%] h-[32px] w-[32px] hover:bg-blue-400 flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/editTask/${todo.id}`);
            }}
          >
            <img className="h-[16px] w-[16px]" src={EditIcon} />
          </button>
        </div>
      </div>
      <div className="flex flex-col space-y-2 mt-2">
        <div>
          <img className="inline-block w-[24px]" src={CalendarIcon} />
          <span className="text-[#b2aeae]"> Due Date: </span>
          <span style={{ color: colorLabel }}>
            {todoDate.toLocaleString("en-US", { timeZone: "EST" })}
          </span>
        </div>
        <div>
          <img className="inline-block w-[24px]" src={PriorityIcon} />
          <span className="text-[#b2aeae]"> Priority: </span>
          <span>{`${getLabelForNumber(todo.priority)}(${todo.priority}/10)`}</span>
        </div>
        <div>
          <img className="inline-block w-[24px]" src={ComplexityIcon} />
          <span className="text-[#b2aeae]"> Complexity: </span>
          <span>{`${getLabelForNumber(todo.complexity)}(${todo.complexity}/10)`}</span>
        </div>
        {todo.subtasks.length >= 1 &&
          <div>
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
          </div>
        }
        <p className="flex">
          {todo.tags &&
            todo.tags.split(",").map((tag, index) => (
              <span
                className={`${
                  index % 2 == 0 ? "bg-blue-100" : "bg-red-100"
                } rounded-full p-2 flex items-center mr-2`}
                key={index}
              >
                {tag}
              </span>
            ))}
        </p>
      </div>
    </div>
  );
}

export default Todo;
