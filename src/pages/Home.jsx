import Todo from "../components/Todo";
import { useState, useEffect } from "react";
import { useTodo } from "../contexts/todoContext";
import { Link } from "react-router-dom";


const Home = () => {
  const { todos, sortTodos } = useTodo();
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    console.log('Search term:', searchTerm);
  };

  return (
    <div className = "homeDiv">
      <div className="todo-list">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Search</button>
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
        {todos.map((todo) => (
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
