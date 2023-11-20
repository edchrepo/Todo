import { useState } from "react";
import { useTodo } from "../contexts/todoContext";
import { useNavigate, useParams } from "react-router-dom"
import "../styles.css";

function EditTask() {
  const initialTodos = JSON.parse(localStorage.getItem('todos')) || [];
  const { id } = useParams();

  const todoEdit = initialTodos.find((t) => t.id == id)
  const [subtask, setSubtask] = useState({ text: "", isChecked: false });
  const [subtasks, setSubtasks] = useState(todoEdit.subtasks);
  const [todo, setTodo] = useState(todoEdit);
  const { editTodo } = useTodo();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setTodo({...todo, [e.target.name]: e.target.value})
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todo) return;
    editTodo({...todo, subtasks: subtasks});
    navigate("/");
  };

  const addSubtask = (e) => {
    e.preventDefault(); 
    if (!subtask.text) return;
    setSubtasks([...subtasks, subtask]);
    setSubtask({ text: "", isChecked: false });
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
        value={todo.todoName}
        onChange={handleChange}
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
                onChange={handleChange}
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
            value={todo.date ? todo.date : ""}
            onChange={handleChange}
          />
        </div>
        <div>
        <p>Select Time</p>
          <input
            type="time"
            name="time"
            value={todo.time ? todo.time : ""}
            onChange={handleChange}
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
                value={subtask.text}
                onChange={(e) => setSubtasks([...subtasks].map((s, i) => (i === index ? {...s, text: e.target.value} : s)))}
              />
              <button type="button" onClick={() => removeSubtask(subtask)}>
                x
              </button>
              <br/>
            </>
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
            value={todo.tags}
            onChange={handleChange}
          />
      </div>
      <button type="submit">Save Task</button>
    </form>

  );
}

export default EditTask;
