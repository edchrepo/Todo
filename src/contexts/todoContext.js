import { createContext, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { uid } from "uid";

export const TodoContext = createContext();

export function useTodo() {
  const value = useContext(TodoContext);
  return value;
}

export const TodoProvider = ({ children }) => {
  const { id } = useParams();
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    const newTodos = [...todos, { text, isCompleted: false, id: uid() }];
    setTodos(newTodos);
  };

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
      value={{ todos, addTodo, completeTodo, removeTodo, getTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};
