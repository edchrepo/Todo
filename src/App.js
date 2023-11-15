import React from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import TodoDetail from "./pages/TodoDetail";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask"
import { TodoProvider } from "./contexts/todoContext";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
      </nav>
      <TodoProvider>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/todo/:id" element={<TodoDetail />} />
          <Route path="/addTask" element={<AddTask />} />
          <Route path="/editTask/:id" element={<EditTask />} />
        </Routes>
      </TodoProvider>
    </Router>
  );
}

export default App;
