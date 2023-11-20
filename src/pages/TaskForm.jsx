import React, { useState } from "react";
import { useTodo } from "../contexts/todoContext";
import { useNavigate, useParams } from "react-router-dom"
import { uid } from "uid";
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
    subtasks: []
  };
  const { id } = useParams();
  const { addTodo, editTodo, getTodo } = useTodo();
  const todoEdit = getTodo(id);
  const [subtask, setSubtask] = useState({id: uid(), text: "", isChecked: false });
  const [subtasks, setSubtasks] = useState(todoEdit ? todoEdit.subtasks : []);
  const [todo, setTodo] = useState(todoEdit ? todoEdit : initialValue)
  const navigate = useNavigate();
  const optionLevels = [1,2,3,4,5,6,7,8,9,10];

  const handleChange = (e) => {
    setTodo({...todo, [e.target.name]: e.target.value})
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todo) return;
    if (!todoEdit) {
      addTodo({...todo, subtasks: subtasks});
    }
    else {
      editTodo({...todo, subtasks: subtasks});
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
  }

  const removeSubtask = (task) => {
    setSubtasks([...subtasks].filter((s) => s != task));
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>{!todoEdit ? "Add New Task" : "Edit Task"}</p>
      <p>Task Name</p>
      <input
        type="text"
        className="input"
        name="todoName"
        value={todo.todoName}
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
                checked={todo.priority == level ? true : false}
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
          {subtasks.map((subtask) => (
            <React.Fragment key={subtask.id}>
              <input 
                key={subtask.id}
                type="text"
                name="subtask"
                value={subtask.text}
                onChange={(e) => handleSubtaskChange(e, subtask.id)}
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
            value={todo.tags}
            onChange={handleChange}
          />
      </div>
      <button type="submit">{!todoEdit ? "Create Task" : "Update Task"}</button>
    </form>

  );
}

export default TaskForm;
