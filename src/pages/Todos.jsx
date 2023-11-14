import Todo from "../components/Todo";
import TodoForm from "../components/TodoForm";
import { useTodo } from "../contexts/todoContext";

const Todos = () => {
  const { todos } = useTodo();
  return (
    <div className="todo-list">
      <TodoForm />
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default Todos;
