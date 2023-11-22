import { useNavigate, useParams } from "react-router-dom";
import { useTodo } from "../context/todoContext";
import Todo from "../components/Todo";
import React, { useState, useEffect } from "react";
import {
  CheckIcon,
  RepeatIcon,
  TrashIcon,
  WhiteCheckIcon,
  BackIcon,
} from "../icons";

const TodoDetail = () => {
  const { id } = useParams();
  const { getTodo, editTodo, removeTodo } = useTodo();
  const todo = getTodo(id);
  const [subtasks, setSubtasks] = useState(todo.subtasks);
  const navigate = useNavigate();

  if (!todo) return <div>No todo found</div>;

  useEffect(() => {
    editTodo({ ...todo, subtasks: subtasks });
  }, [subtasks]);

  const handleSubtask = (id) => {
    // Toggle checks current subtask id to !isChecked
    setSubtasks(
      subtasks.map((s) =>
        s.id == id ? { ...s, isChecked: !s.isChecked } : s
      )
    );
  };

  const repeatTask = () => {
    // Changes all subtasks to unChecked to reset task
    setSubtasks(subtasks.map((s) => ({ ...s, isChecked: false })));
  };

  return (
    <div className="xl:px-[40%] lg:px-[30%] md:px-[20%] sm:px-[10%]">
      <button
        className="mt-5 border p-2 bg-[#0d99ff] text-white rounded-full"
        onClick={() => navigate("/")}
      >
        <img src={BackIcon} />
      </button>
      <p className="justify-center text-center font-bold mb-5">Task Details</p>
      <Todo todo={todo} />
      {todo.subtasks.length >= 1 && (
        <p className="mb-5">Checklist for subtasks</p>
      )}
      <ul>
        {subtasks.map((subtask) => (
          <div
            className="bg-white w-[100%] rounded-full p-3 mb-5 flex justify-between items-center"
            key={subtask.id}
          >
            <span>{subtask.text}</span>
            <button
              className="rounded-[50%] h-[32px] w-[32px] flex justify-center items-center"
              style={{
                backgroundColor: subtask.isChecked ? "#0d99ff" : "#90CAF9",
              }}
              type="button"
              onClick={(e) => {
                handleSubtask(subtask.id);
              }}
            >
              {subtask.isChecked ? (
                <img src={WhiteCheckIcon} />
              ) : (
                <img src={CheckIcon} />
              )}
            </button>
          </div>
        ))}
      </ul>
      <div className="flex justify-center">
        <button
          className="bg-[#0d99ff] md:w-[40%] sm:w-[50%] rounded-full p-4 text-white flex justify-center items-center"
          type="button"
          onClick={repeatTask}
        >
          <img className="mr-1.5" src={RepeatIcon} />
          <p>Repeat Task</p>
        </button>
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="bg-red-200 md:w-[40%] sm:w-[50%] rounded-full p-4 flex justify-center items-center"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            removeTodo(todo);
            navigate("/");
          }}
        >
          <img className="mr-1.5" src={TrashIcon} />
          <p>Delete Task</p>
        </button>
      </div>
    </div>
  );
};

export default TodoDetail;
