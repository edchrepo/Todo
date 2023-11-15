import { useState } from "react";
import { useTodo } from "../contexts/todoContext";
import { useHistory, useNavigate } from "react-router-dom"

function EditTask() {
  const [value, setValue] = useState("");
  const { addTodo } = useTodo();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
}

export default EditTask;
