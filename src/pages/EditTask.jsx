import { useState } from "react";
import { useTodo } from "../contexts/todoContext";
import { useNavigate, useParams } from "react-router-dom"
import "../styles.css";

function EditTask() {
  const initialTodos = JSON.parse(localStorage.getItem('todos')) || [];
  const { id } = useParams();

  const todoEdit = initialTodos.find((t) => t.id == id)
  const [todo, setTodo] = useState(todoEdit);
  const { editTodo } = useTodo();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setTodo({...todo, [e.target.name]: e.target.value})
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todo) return;
    editTodo(todo);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        name="todoName"
        value={todo.todoName}
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
                checked={todo.priority == level ? true : false}
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
                checked={todo.complexity == level ? true : false}
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
            value={todo.date ? todo.date : ""}
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
          {todo.subtasks.map((subtask, index) => (
            <li key={index}>{subtask}</li>
          ))}
        </ul>
        <div>
          <input
            type="text"
            name="subtasks"
            value={todo.subtasks}
            onChange={handleChange}
            placeholder="Add New Subtask..."
          />
          <button type="button" onClick={handleChange}>
            +
          </button>
        </div>
      </div>
      <button type="submit">Edit Task</button>
    </form>

  );
}

export default EditTask;
