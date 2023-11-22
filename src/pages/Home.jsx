import Todo from "../components/Todo";
import { useTodo } from "../context/todoContext";
import { Link } from "react-router-dom";
import "../styles.css";
import { PlusIcon, PowerOnIcon, PowerOffIcon } from "../icons";

function Home() {
  const {
    displayedTodos,
    tags,
    power,
    powerTodos,
    togglePower,
    setSearchTerm,
    setSort,
    setFilterTags,
  } = useTodo();

  return (
    <div className="xl:px-[40%] lg:px-[30%] md:px-[20%] sm:px-[10%] mt-5">
      <input
        type="text"
        className="w-[100%] border p-2 border-solid border-[#ccc] rounded-lg mb-2.5"
        placeholder="Search..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex justify-between">
        <div className="w-[50%]">
          <p className="font-bold">Sort</p>
          <select
            className="w-[100%] border p-2 border-solid border-[#ccc] rounded-lg mb-2.5"
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Default</option>
            <option value="Ascending Date">Ascending Date</option>
            <option value="Descending Date">Descending Date</option>
            <option value="Ascending Complexity">Ascending Complexity</option>
            <option value="Descending Complexity">Descending Complexity</option>
            <option value="Ascending Priority">Ascending Priority</option>
            <option value="Descending Priority">Descending Priority</option>
          </select>
        </div>
        <div className="w-[50%]">
          <p className="font-bold">Category</p>
          <select
            className="w-[100%] border p-2 border-solid border-[#ccc] rounded-lg mb-2.5"
            onChange={(e) => setFilterTags(e.target.value)}
          >
            <option value="">Default</option>
            {tags.map((tag, index) => (
              <option key={index} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex justify-center space-x-2 mb-2.5">
        <button
          className="bg-[#0d99ff] rounded-full p-4 text-white flex justify-center items-center"
          onClick={() => togglePower()}
        >
          <p className="mr-1.5">Power </p>
          <p className="mr-1.5">{!power ? "On" : "Off"}</p>
          {!power ? <img src={PowerOnIcon} /> : <img src={PowerOffIcon} />}
        </button>
        <Link to={"/addTask"}>
          <button className="bg-[#0d99ff] rounded-full p-4 text-white flex justify-center items-center">
            <img className="mr-1.5" src={PlusIcon} />
            <p>Add New Task</p>
          </button>
        </Link>
      </div>
      <div className="todos">
        {power && powerTodos ? (
          <Todo key={powerTodos.id} todo={powerTodos} />
        ) : (
          displayedTodos.map((todo) => <Todo key={todo.id} todo={todo} />)
        )}
      </div>
    </div>
  );
}

export default Home;
