import { useParams } from "react-router-dom";
import { useTodo } from "../contexts/todoContext";
import Todo from "../components/Todo"
import React, { useState, useEffect } from "react";

const TodoDetail = () => {
  const { id } = useParams();
  const { getTodo, editTodo } = useTodo();
  const [progress, setProgress] = useState(0);
  const todo = getTodo(id);
  const [subtasks, setSubtasks] = useState(todo.subtasks);

  if (!todo) return <div>No todo found</div>;

  useEffect(() => {
    // When a subtask checks, update progress bar and update todo with updated subtasks
    const totalCheckedSubtasks = subtasks.filter(
      (subtask) => subtask.isChecked
    ).length;
    setProgress(Math.floor((totalCheckedSubtasks / subtasks.length) * 100));
    editTodo({...todo, subtasks: subtasks})
  }, [subtasks]);


  const handleSubtask = (id) => {
    // Toggle checks current subtask id to !isChecked
    setSubtasks(
      [...subtasks].map((s) =>
        s.id == id ? { ...s, isChecked: !s.isChecked } : s
      )
    );
  };

  const repeatTask = () => {
    // Changes all subtasks to unChecked to reset task
    setSubtasks([...subtasks].map((s) => ({...s, isChecked: false })));
  }

  return (
    <div>
      <p>Task Details</p>
      <Todo todo={todo}/>
      <p>Checklist for subtasks</p>
      <ul>
        {subtasks.map((subtask) => (
          <React.Fragment key={subtask.id}>
            <div style={{textDecoration: subtask.isChecked ? "line-through" : ""}}>
              {subtask.text}
              <button type="button" onClick={(e) => {handleSubtask(subtask.id)}}>&#10003;</button>
            </div>
            <br/>
          </React.Fragment>
        ))}
      </ul>
      <button type="button" onClick={repeatTask}>Repeat Task</button>
    </div>
  );
};

export default TodoDetail;
