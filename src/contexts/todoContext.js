import { createContext, useState, useContext, useEffect } from "react";
import { uid } from "uid";

export const TodoContext = createContext();

export function useTodo() {
  const value = useContext(TodoContext);
  return value;
}

export const TodoProvider = ({ children }) => {
  const initialTodos = JSON.parse(localStorage.getItem('todos')) || [];
  const [todos, setTodos] = useState(initialTodos);
  const [power, setPower] = useState(false);
  const [tags, setTags] = useState([]);
  const [powerTodos, setPowerTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTags, setFilterTags] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    // When todos change, recalculate powerTodos
    calcPowerTodos();
    generateTags();
  }, [todos]);

  const calcPowerTodos = () => {
    const powerTodo = [...todos]
                      .filter((t) => !t.isCompleted)
                      .sort((a,b) => (b.priority + b.complexity) - (a.priority + a.complexity))[0];
    setPowerTodos(powerTodo);
  }

  const displayedTodos = [...todos]
    .filter((t) => t.todoName.includes(searchTerm) && t.tags.includes(filterTags))
    .sort((a, b) => {
      switch (sort) {
        case 'Ascending Date':
          return new Date(`${a.date}T${a.time || '00:00:00'}`) - new Date(`${b.date}T${b.time || '00:00:00'}`);
        case 'Descending Date':
          return new Date(`${b.date}T${b.time || '00:00:00'}`) - new Date(`${a.date}T${a.time || '00:00:00'}`);
        case 'Ascending Complexity':
          return a.complexity - b.complexity;
        case 'Descending Complexity':
          return b.complexity - a.complexity;
        case 'Ascending Priority':
          return a.priority - b.priority;
        case 'Descending Priority':
          return b.priority - a.priority;
        default:
          return 0;
      }
  });

  const generateTags = () => {
    const tags = new Set();
    todos.forEach(
      (t) => t.tags && t.tags.split(",").forEach((tag) => tags.add(tag.trim()))
    );
    setTags([...tags]);
  }

  const addTodo = (todo) => {
    const newTodos = [...todos, {...todo, id : uid()}];
    setTodos(newTodos);
  };

  const editTodo = (todo) => {
    const newTodos = [...todos].map((t) => t.id === todo.id ? todo : t)
    setTodos(newTodos);
  }

  const completeTodo = (todo) => {
    setTodos((todos) =>
      todos.map((t) =>
        t.id === todo.id ? { ...t, isCompleted: !t.isCompleted } : t
      )
    );
  };

  const removeTodo = (todo) => {
    setTodos((todos) => todos.filter((t) => t.id !== todo.id));
    if(power) setPower(!power);
  };

  const getTodo = (id) => {
    return todos.find((todo) => todo.id === id);
  };

  const togglePower = () => {
    if (!power) calcPowerTodos();
    setPower(!power);
  }

  return (
    <TodoContext.Provider
      value={{ todos, tags, displayedTodos, power, powerTodos, togglePower, setSearchTerm, setFilterTags, setSort, addTodo, editTodo, completeTodo, removeTodo, getTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};
