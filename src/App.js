import React from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Todos from "./pages/Todos";
import TodoDetail from "./pages/Todo";
import { TodoProvider } from "./contexts/todoContext";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
      </nav>
      <TodoProvider>
        <Routes>
          <Route exact path="/" element={<Todos />} />
          <Route path="/todo/:id" element={<TodoDetail />} />
        </Routes>
      </TodoProvider>
    </Router>
  );
}

export default App;
