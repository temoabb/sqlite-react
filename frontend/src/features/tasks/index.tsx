import { useMemo } from "react";

import TasksList from "./TasksList";

import useTaskStatus from "@/hooks/useTaskStatus";

import { TASKS } from "./Tasks.config";
import TasksFiltersBar from "./TasksFiltersBar";

const Tasks = () => {
  const { status } = useTaskStatus();

  const renderedTasks = useMemo(() => {
    const requestCompletedTasks = status === "completed";
    return TASKS.filter((task) => task.isCompleted === requestCompletedTasks);
  }, [status]);

  return (
    <div className="min-h-screen py-10 px-3 sm:p-x-0">
      <div className="max-w-[600px] bg-[#E8F1FD] rounded-[12px] p-5 mx-auto flex flex-col items-center justify-center gap-y-5">
        <TasksFiltersBar />
        <TasksList tasks={renderedTasks} />
      </div>
    </div>
  );
};

export default Tasks;
