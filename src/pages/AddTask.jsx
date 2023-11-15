import { useState } from "react";
import { useTodo } from "../contexts/todoContext";
import { useHistory, useNavigate } from "react-router-dom"
import "../styles.css";

function AddTask() {
  const initialState = { todoName: "", priority: 0, complexity: 0, date: 0, time: 0, subtasks: [], isCompleted: false };
  const [todoData, setTodoData] = useState(initialState);
  const { addTodo } = useTodo();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setTodoData({...todoData, [e.target.name]: e.target.value})
  };
  
  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  
  //   setTodoData((prevTodoData) => ({
  //     ...prevTodoData,
  //     [name]: value,
  //     subtasks: name === 'subtasks' ? [...prevTodoData.subtasks, value] : prevTodoData.subtasks,
  //   }));
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todoData) return;
    addTodo(todoData);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        name="todoName"
        onChange={(event) => {
            handleChange(event);
        }}
      />
      <div>
        <p>Select Priority Level</p>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
            <label key={level}>
              <input
                type="radio"
                name="priority"
                value={level}
                onChange={(event) => {handleChange(event)}}
              />
              {level}
            </label>
          ))}
      </div>  
      <div>
        <p>Select Complexity Level</p>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
            <label key={level}>
              <input
                type="radio"
                name="complexity"
                value={level}
                onChange={(event) => {handleChange(event)}}
              />
              {level}
            </label>
          ))}
      </div>  
      <div className="datetime">
        <div>
          <p>Select Date</p>
          <input
            type="date"
            name="date"
            onChange={(event) => {handleChange(event)}}
          />
        </div>
        <div>
        <p>Select Time</p>
          <input
            type="time"
            name="time"
            onChange={(event) => {handleChange(event)}}
          />
        </div>
      </div>
      <div>
        <p>Add CheckList For Subtasks</p>
        <ul>
          {todoData.subtasks.map((subtask, index) => (
            <li key={index}>{subtask}</li>
          ))}
        </ul>
        <div>
          <input
            type="text"
            name="subtasks"
            value={todoData.subtasks}
            onChange={handleChange}
            placeholder="Add New Subtask..."
          />
          <button type="button" onClick={handleChange}>
            +
          </button>
        </div>
      </div>
      <button type="submit">Create Task</button>
    </form>

  );
}

export default AddTask;
