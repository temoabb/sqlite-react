import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import TasksPage from "./pages/TasksPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to="/tasks" />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="*" element={<div>Something went wrong</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
