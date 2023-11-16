import { createContext, useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { uid } from "uid";

export const TodoContext = createContext();

export function useTodo() {
  const value = useContext(TodoContext);
  return value;
}

export const TodoProvider = ({ children }) => {
  const { id } = useParams();
  const initialTodos = JSON.parse(localStorage.getItem('todos')) || [];
  const [filteredTodos, setFilteredTodos] = useState(initialTodos);
  const [categoryFiltered, setCategoryFiltered] = useState(initialTodos);
  const [todos, setTodos] = useState(initialTodos);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    const newTodos = [...todos, {...todo, id : uid()}];
    setTodos(newTodos);
  };

  const editTodo = (todo) => {
    const newTodos = [...todos].map((t) => t.id === todo.id ? todo : t)
    setTodos(newTodos);
  }

  const sortTodos = (selectedOption) => {
    let sortedTodos;
  
    switch (selectedOption) {
      case 'Ascending Date':
        sortedTodos = [...todos].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        break;
      case 'Descending Date':
        sortedTodos = [...todos].sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
        break;
      case 'Ascending Complexity':
        sortedTodos = [...todos].sort((a, b) => a.complexity - b.complexity);
        break;
      case 'Descending Complexity':
        sortedTodos = [...todos].sort((a, b) => b.complexity - a.complexity);
        break;
      case 'Ascending Priority':
        sortedTodos = [...todos].sort((a, b) => a.priority - b.priority);
        break;
      case 'Descending Priority':
        sortedTodos = [...todos].sort((a, b) => b.priority - a.priority);
        break;
      default:
        sortedTodos = todos;
    }
    setTodos(sortedTodos);
  }

  const searchFilterTodos = (searchTerm) => {
    setSearchTerm(searchTerm);
    let filtered = [...todos].filter((todo) => todo.todoName.includes(searchTerm))
    setFilteredTodos(filtered);
  }

  const categoryFilterTodos = (category) => {
    if (!(category == "Default")) {
      let filtered = [...todos].filter((todo) => todo.tags == category)
      setCategoryFiltered(filtered);
    }
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

  useEffect(() => {
    searchFilterTodos(searchTerm);
  }, [todos]);

  return (
    <TodoContext.Provider
      value={{ todos, filteredTodos, categoryFiltered, sortTodos, searchFilterTodos, categoryFilterTodos, addTodo, editTodo, completeTodo, removeTodo, getTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};
