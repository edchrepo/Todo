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
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTags, setFilterTags] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

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
  };

  const getTodo = (id) => {
    return todos.find((todo) => todo.id === id);
  };

  return (
    <TodoContext.Provider
      value={{ todos, displayedTodos, setSearchTerm, setFilterTags, setSort, addTodo, editTodo, completeTodo, removeTodo, getTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};
