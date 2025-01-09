import { Loader } from "lucide-react";

import TasksList from "./TasksList";

import useTasksSearchParms from "@/hooks/useTasksSearchParams";

import TasksFiltersBar from "./TasksFiltersBar";

import { useGetTasks } from "./useGetTasks";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

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

  return (
    <div className="min-h-screen py-10 px-3 sm:p-x-0 overflow-hidden">
      <div className="transition-all w-[335px] sm:w-[600px] relative bg-[#E8F1FD] rounded-[12px] p-5 pb-10 flex flex-col items-center justify-center gap-y-5 mx-auto">
        <TasksFiltersBar />

        {!isPending && !error && data?.tasks.length === 0 ? (
          <>
            <Separator />
            <div className="mt-2 mb-5 text-[#6A6CE0] text-[12px] text-center">
              Looks like there are no active tasks in this category. Would you
              like to create a new one?
            </div>
          </>
        ) : null}

        <TasksList tasks={data?.tasks || []} />

        {status === "incomplete" ? (
          <Button className="absolute rounded-[50%] w-[52px] h-[52px] bg-[#6A6CE0] hover:bg-[#6162b8] bottom-2 flex items-center justify-center">
            <span className="text-white text-3xl">+</span>
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default Tasks;
