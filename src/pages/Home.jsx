import Todo from "../components/Todo";
import { useState, useEffect } from "react";
import { useTodo } from "../contexts/todoContext";
import { Link } from "react-router-dom";
import "../styles.css";

const Home = () => {
  const { todos, filteredTodos, categoryFiltered, sortTodos, searchFilterTodos, categoryFilterTodos } = useTodo();
  const [category, setCategory] = useState("");

  const handleChange = (e) => {
    searchFilterTodos(e.target.value);
  };

  useEffect(() => {
  }, [categoryFiltered]);

  return (
    <div className = "homeDiv">
      <div className="todo-list">
        <input
          type="text"
          placeholder="Search..."
          onChange={handleChange}
        />
        <div className="sortcategory">
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
          <div>
            <p>Category</p>
            <select onChange={(e) => categoryFilterTodos(e.target.value)}>
              <option value="Default">Default</option>
              {filteredTodos.map((todo, index) => todo.tags ? 
                <option key={index} value={todo.tags}>{todo.tags}</option> : null
              )}
            </select>
          </div>
        </div>
        {category && category != "Default" ? 
          categoryFiltered.map((todo) => (<Todo key={todo.id} todo={todo} />)) : 
          filteredTodos.map((todo) => (<Todo key={todo.id} todo={todo} />))
        }
      <Link to={"/addTask"}>
          <button>Add New Task</button>
      </Link>
      </div>
    </div>
  );
};

export default Home;
