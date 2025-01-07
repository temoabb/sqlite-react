import TasksList from "./features/tasks/TasksList";

import { TASKS } from "./features/tasks/Tasks.config";

function App() {
  return (
    <>
      <h1 className="text-green-600 font-bold">Todo App</h1>
      <div className="bg-[#E8F1FD] flex flex-col items-center py-2 gap-y-2.5 border max-w-[700px] mx-auto px-10">
        <TasksList completed tasks={TASKS} />
      </div>
    </>
  );
}

export default App;
