import { useMemo } from "react";

import TasksList from "./TasksList";

import useTasksSearchParms from "@/hooks/useTasksSearchParams";

import { TASKS } from "./Tasks.config";
import TasksFiltersBar from "./TasksFiltersBar";
import { useGetTasks } from "./useGetTasks";

const Tasks = () => {
  const { status, keyword } = useTasksSearchParms();

  const { data, isPending } = useGetTasks({ status, keyword });

  console.log("data", data);

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
