import React, { useState } from "react";
import { useTodo } from "../context/todoContext";
import { useNavigate, useParams } from "react-router-dom";
import { uid } from "uid";
import { BackIcon, PlusIcon, WhiteRemoveIcon } from "../icons";
import "../styles.css";

function TaskForm() {
  const initialValue = {
    todoName: "",
    priority: 0,
    complexity: 0,
    date: 0,
    time: 0,
    tags: "",
    isCompleted: false,
    subtasks: [],
  };
  const { id } = useParams();
  const { addTodo, editTodo, getTodo } = useTodo();
  const todoEdit = getTodo(id);
  const [subtask, setSubtask] = useState({
    id: uid(),
    text: "",
    isChecked: false,
  });
  const [subtasks, setSubtasks] = useState(todoEdit ? todoEdit.subtasks : []);
  const [todo, setTodo] = useState(todoEdit ? todoEdit : initialValue);
  const navigate = useNavigate();
  const optionLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handleChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todo) return;
    if (!todoEdit) {
      addTodo({ ...todo, subtasks: subtasks });
    } else {
      editTodo({ ...todo, subtasks: subtasks });
    }
    navigate("/");
  };

  const handleSubtaskChange = (e, subtaskId) => {
    setSubtasks((prevSubtasks) =>
      prevSubtasks.map((s) =>
        s.id === subtaskId ? { ...s, text: e.target.value } : s
      )
    );
  };

  const addSubtask = (e) => {
    e.preventDefault();
    if (!subtask.text) return;
    setSubtasks([...subtasks, subtask]);
    setSubtask({ id: uid(), text: "", isChecked: false });
  };

  const removeSubtask = (task) => {
    setSubtasks(subtasks.filter((s) => s != task));
  };

  const handleNewSubtaskChange = (e) => {
    setSubtask({ ...subtask, text: e.target.value })          
  }

  return (
    <div className="xl:px-[40%] lg:px-[30%] md:px-[20%] sm:px-[10%] flex justify-center">
      <form onSubmit={handleSubmit}>
        <button
          className="mt-5 border p-2 bg-[#0d99ff] text-white rounded-full"
          onClick={() => navigate("/")}
        >
          <img src={BackIcon} />
        </button>
        <p className="text-center font-bold">
          {!todoEdit ? "Add New Task" : "Edit Task"}
        </p>
        <p className="my-2">Task Name</p>
        <input
          type="text"
          className="w-[100%] border p-2 border-solid border-[#ccc] rounded-lg mb-2.5"
          name="todoName"
          value={todo.todoName}
          onChange={handleChange}
        />
        <div>
          <p className="my-2">Select Priority Level</p>
          {optionLevels.map((level) => (
            <label
              className={`inline-block cursor-pointer rounded-full mb-2 mr-4 ${
                todo.priority == level ? "bg-[#0d99ff] text-white" : ""
              }`}
              key={level}
            >
              <input
                type="radio"
                name="priority"
                className="absolute opacity-0 cursor-pointer"
                value={level}
                checked={todo.priority == level ? true : false}
                onChange={handleChange}
              />
              <span className="flex items-center justify-center w-6 h-6 border border-blue-200 rounded-full">
                {level}
              </span>
            </label>
          ))}
        </div>
        <div>
          <p className="my-2">Select Complexity Level</p>
          {optionLevels.map((level) => (
            <label
              className={`inline-block cursor-pointer rounded-full mb-2 mr-4 ${
                todo.complexity == level ? "bg-[#0d99ff] text-white" : ""
              }`}
              key={level}
            >
              <input
                type="radio"
                name="complexity"
                className="absolute opacity-0 cursor-pointer"
                value={level}
                checked={todo.complexity == level ? true : false}
                onChange={handleChange}
              />
              <span className="flex items-center justify-center w-6 h-6 border border-blue-200 rounded-full">
                {level}
              </span>
            </label>
          ))}
        </div>
        <div className="w-[100%] flex justify-between mt-5">
          <div>
            <p className="mb-2">Select Date</p>
            <input
              type="date"
              name="date"
              className="border p-2 border-solid border-[#ccc] rounded-lg mb-2.5"
              value={todo.date ? todo.date : ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <p className="mb-2">Select Time</p>
            <input
              type="time"
              name="time"
              className="border p-2 border-solid border-[#ccc] rounded-lg mb-2.5"
              value={todo.time ? todo.time : ""}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <p className="my-5">Add CheckList For Subtasks</p>
          <ul>
            {subtasks.map((subtask) => (
              <div
                className="bg-white w-[100%] rounded-full p-3 mb-5 flex justify-between"
                key={subtask.id}
              >
                <input
                  key={subtask.id}
                  type="text"
                  name="subtask"
                  className="flex-grow"
                  value={subtask.text}
                  onChange={(e) => handleSubtaskChange(e, subtask.id)}
                />
                <button
                  className="bg-red-500 border h-8 w-8 rounded-full text-white flex justify-center items-center hover:border-red-700"
                  type="button"
                  onClick={() => removeSubtask(subtask)}
                >
                  <img src={WhiteRemoveIcon} />
                </button>
                <br />
              </div>
            ))}
          </ul>
          <form type="submit" onSubmit={addSubtask}>
            <div
              className="bg-white w-[100%] rounded-full p-3 mb-5 flex justify-between"
              key={subtask.id}
            >
              <input
                type="text"
                name="subtasks"
                className="flex-grow"
                value={subtask.text}
                placeholder="Add New Subtask..."
                onChange={handleNewSubtaskChange}
              />
              <button
                className="bg-[#0d99ff] border h-8 w-8 rounded-full text-white flex justify-center items-center hover:border-blue-700"
                type="submit"
                onClick={addSubtask}
              >
                <img src={PlusIcon} />
              </button>
            </div>
          </form>
        </div>
        <div>
          <p className="my-5">Add Tags</p>
          <input
            type="text"
            name="tags"
            className="bg-white w-[100%] rounded-full p-2 mb-5"
            value={todo.tags}
            placeholder="Tag1, Tag2, Tag3, ..."
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-center">
          <button
            className="bg-[#0d99ff] rounded-full p-4 text-white"
            type="submit"
          >
            {!todoEdit ? "Create Task" : "Update Task"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
