import { Loader } from "lucide-react";

import TasksList from "./TasksList";
import TasksFiltersBar from "./TasksFiltersBar";
import CreateNewTaskButton from "./CreateNewTaskButton";
import NoActiveTasksMessage from "./NoActiveTasksMessage";

import useTasksSearchParms from "@/hooks/useTasksSearchParams";

import { useGetTasks } from "./useGetTasks";

const Tasks = () => {
  const { status, keyword } = useTasksSearchParms();

  const { data, isPending, error } = useGetTasks({ status, keyword });

  if (isPending) {
    return (
      <div className="min-h-screen flex w-full items-center justify-center">
        <Loader className="size-4 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return <h1 className="text-center my-8 text-lg">Something went wrong.</h1>;
  }

  const noActiveTasks = data?.tasks?.length === 0;

  return (
    <div className="min-h-screen py-10 px-3 sm:p-x-0 overflow-hidden">
      <div className="transition-all w-[335px] sm:w-[600px] relative bg-[#E8F1FD] rounded-[12px] p-5 pb-10 flex flex-col items-center justify-center gap-y-5 mx-auto">
        <TasksFiltersBar noActiveTasks={noActiveTasks} />

        {noActiveTasks ? <NoActiveTasksMessage /> : null}

        <TasksList tasks={data?.tasks || []} />

        {status === "incomplete" ? <CreateNewTaskButton /> : null}
      </div>
    </div>
  );
};

export default Tasks;
