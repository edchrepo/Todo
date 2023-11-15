import Todo from "../components/Todo";
import { useState, useEffect } from "react";
import { useTodo } from "../contexts/todoContext";
import { Link } from "react-router-dom";


const Home = () => {
  const { todos, filteredTodos, sortTodos, filterTodos } = useTodo();

  const handleChange = (e) => {
    filterTodos(e.target.value);
  };

  return (
    <div className = "homeDiv">
      <div className="todo-list">
        <input
          type="text"
          placeholder="Search..."
          onChange={handleChange}
        />
        <div>
          <p>Sort</p>
          <select onChange={(e) => sortTodos(e.target.value)}>
            <option value="Default">Default</option>
            <option value="Ascending Date">Ascending Date</option>
            <option value="Descending Date">Descending Date</option>
            <option value="Ascending Complexity">Ascending Complexity</option>
            <option value="Descending Complexity">Descending Complexity</option>
            <option value="Ascending Priority">Ascending Priority</option>
            <option value="Descending Priority">Descending Priority</option>
          </select>
        </div>
        {filteredTodos.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      <Link to={"/addTask"}>
          <button>Add New Task</button>
      </Link>
      </div>
    </div>
  );
};

export default Home;
