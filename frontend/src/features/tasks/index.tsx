import TasksList from "./TasksList";

import { TASKS } from "./Tasks.config";

const Tasks = () => {
  return (
    <div className="bg-[#E8F1FD] w-full py-10 flex justify-center gap-y-2.5">
      <TasksList completed tasks={TASKS} />
    </div>
  );
};

export default Tasks;
