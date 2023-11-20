import React, { useState } from "react";
import { useTodo } from "../contexts/todoContext";
import { useNavigate } from "react-router-dom"
import { uid } from "uid";
import "../styles.css";

function AddTask() {
  const initialState = { todoName: "", priority: 0, complexity: 0, date: 0, time: 0, tags: "", isCompleted: false };
  const [todoData, setTodoData] = useState(initialState);
  const [subtask, setSubtask] = useState({id: uid(), text: "", isChecked: false});
  const [subtasks, setSubtasks] = useState([]);
  const { addTodo } = useTodo();
  const navigate = useNavigate();
  const optionLevels = [1,2,3,4,5,6,7,8,9,10];

  const handleChange = (e) => {
    setTodoData({...todoData, [e.target.name]: e.target.value})
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todoData) return;
    addTodo({...todoData, subtasks: subtasks});
    navigate("/");
  };

  const addSubtask = (e) => {
    e.preventDefault(); 
    if (!subtask.text) return;
    setSubtasks([...subtasks, subtask]);
    setSubtask({ id: uid(), text: "", isChecked: false });
  }

  const removeSubtask = (task) => {
    setSubtasks([...subtasks].filter((s) => s != task));
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        name="todoName"
        onChange={handleChange}
      />
      <div>
        <p>Select Priority Level</p>
          {optionLevels.map((level) => (
            <label key={level}>
              <input
                type="radio"
                name="priority"
                value={level}
                onChange={handleChange}
              />
              {level}
            </label>
          ))}
      </div>  
      <div>
        <p>Select Complexity Level</p>
          {optionLevels.map((level) => (
            <label key={level}>
              <input
                type="radio"
                name="complexity"
                value={level}
                onChange={handleChange}
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
            onChange={handleChange}
          />
        </div>
        <div>
        <p>Select Time</p>
          <input
            type="time"
            name="time"
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        <p>Add CheckList For Subtasks</p>
        <ul>
          {subtasks.map((subtask) => (
            <React.Fragment key={subtask.id}>
              <input 
                key={subtask.id}
                type="text"
                name="subtask"
                value={subtask.text}
                onChange={(e) => setSubtasks((prevSubtasks) => prevSubtasks.map((s) => (s.id === subtask.id ? { ...s, text: e.target.value } : s)))}
              />
              <button type="button" onClick={() => removeSubtask(subtask)}>
                x
              </button>
              <br/>
            </React.Fragment>
          ))}
        </ul>
        <div>
          <form type="submit" onSubmit={addSubtask}>
            <input
              type="text"
              name="subtasks"
              value={subtask.text}
              placeholder="Add New Subtask..."
              onChange={(e) => setSubtask({...subtask, text: e.target.value})}
            />
            <button type="submit" onClick={addSubtask}>
              +
            </button>
          </form>
        </div>
      </div>
      <div>
        <p>Add Tags</p>
          <input
            type="text"
            name="tags"
            onChange={handleChange}
          />
      </div>
      <button type="submit">Create Task</button>
    </form>

  );
}

export default AddTask;
