import Todo from "../components/Todo";
import { useTodo } from "../contexts/todoContext";
import { Link } from "react-router-dom";
import "../styles.css";

function Home() {
  const { todos, displayedTodos, power, powerTodo, togglePower, setSearchTerm, setSort, setFilterTags} = useTodo();
  const tags = new Set();
  todos.forEach((t) => t.tags.split(',').forEach((tag) => tags.add(tag.trim())))

  return (
    <div className = "homeDiv">
      <div className="todo-list">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="sortcategory">
          <div>
            <p>Sort</p>
            <select onChange={(e) => setSort(e.target.value)}>
              <option value="">Default</option>
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
            <select onChange={(e) => setFilterTags(e.target.value)}>
              <option value="">Default</option>
              {[...tags].map((tag, index) =>
                <option key={index} value={tag}>{tag}</option>
              )}
            </select>
          </div>
        </div>
        {power ? <Todo key={powerTodo.id} todo={powerTodo}/> : displayedTodos.map((todo) => (<Todo key={todo.id} todo={todo} />))}
        <button onClick={() => togglePower()}>{`Power ${!power ? "On" : "Off"}`}</button>
      <Link to={"/addTask"}>
          <button>Add New Task</button>
      </Link>
      </div>
    </div>
  );
};

export default Home;
