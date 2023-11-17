import { useState, useEffect } from "react";
import { useTodo } from "../contexts/todoContext";
import { useNavigate } from "react-router-dom"
import "../styles.css";

function AddTask() {
  const initialState = { todoName: "", priority: 0, complexity: 0, date: 0, time: 0, tags: "", sCompleted: false };
  const [todoData, setTodoData] = useState(initialState);
  const [subtask, setSubtask] = useState("");
  const [subtasks, setSubtasks] = useState([]);
  const { addTodo } = useTodo();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setTodoData({...todoData, [e.target.name]: e.target.value})
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todoData) return;

    // handle datetime converion before adding todo to list of todos

    const dateTimeString = `${todoData.date}T${todoData.time || '00:00:00'}`;

    addTodo({...todoData, dueDate: dateTimeString, subtasks: subtasks});
    navigate("/");
  };

  const addSubTask = () => {
    setSubtasks([...subtasks, subtask]);
    setSubtask("");
  }

  const removeSubTask = (task) => {
    setSubtasks([...subtasks].filter((s) => s != task));
  }

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
          {subtasks.map((subtask, index) => (
            <>
              <input 
                key={index}
                type="text"
                name="subtask"
                value={subtask}
                onChange={(e) => setSubtasks([...subtasks].map((s, i) => (i === index ? e.target.value : s)))}
              />
              <button type="button" onClick={() => removeSubTask(subtask)}>
                x
              </button>
              <br/>
            </>
          ))}
        </ul>
        <div>
          <input
            type="text"
            name="subtasks"
            value={subtask}
            placeholder="Add New Subtask..."
            onChange={(e) => setSubtask(e.target.value)}
          />
          <button type="button" onClick={addSubTask}>
            +
          </button>
        </div>
      </div>
      <div>
        <p>Add Tags</p>
          <input
            type="text"
            name="tags"
            onChange={(event) => {
                handleChange(event);
            }}
          />
      </div>
      <button type="submit">Create Task</button>
    </form>

  );
}

export default AddTask;
