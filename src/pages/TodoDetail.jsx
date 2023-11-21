import { useNavigate, useParams } from "react-router-dom";
import { useTodo } from "../contexts/todoContext";
import Todo from "../components/Todo"
import React, { useState, useEffect } from "react";

const TodoDetail = () => {
  const { id } = useParams();
  const { getTodo, editTodo } = useTodo();
  const todo = getTodo(id);
  const [subtasks, setSubtasks] = useState(todo.subtasks);
  const navigate = useNavigate();

  if (!todo) return <div>No todo found</div>;

  useEffect(() => {
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
    <div className="px-[30%]">
      <button className="mt-5 border p-2 bg-[#0d99ff] text-white rounded-full" onClick={() => navigate("/")}>⏎ Back</button>
      <p className="justify-center text-center font-bold mb-5">Task Details</p>
      <Todo todo={todo}/>
      <p className="mb-5">Checklist for subtasks</p>
      <ul>
        {subtasks.map((subtask) => (
          <div className="bg-white w-[100%] rounded-full p-3 mb-5 flex justify-between items-center" key={subtask.id}>
            <span>{subtask.text}</span>
            <button className= "rounded-[50%] h-[32px] w-[32px]" 
                    style={{backgroundColor: subtask.isChecked ? "#0d99ff" : "#90CAF9"}} 
                    type="button" 
                    onClick={(e) => {handleSubtask(subtask.id)}}>&#10003;</button>
          </div>
        ))}
      </ul>
      <div className="flex justify-center">
        <button className="bg-[#0d99ff] rounded-full p-4 text-white" type="button" onClick={repeatTask}>Repeat Task</button>
      </div>
    </div>
  );
};

export default TodoDetail;
