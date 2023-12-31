import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import TodoDetail from "./pages/TodoDetail";
import TaskForm from "./pages/TaskForm"
import { TodoProvider } from "./context/todoContext";

function App() {
  return (
    <Router>
      <TodoProvider>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/todo/:id" element={<TodoDetail />} />
          <Route path="/addTask" element={<TaskForm />} />
          <Route path="/editTask/:id" element={<TaskForm />} />
        </Routes>
      </TodoProvider>
    </Router>
  );
}

export default App;
