import { CircleX, Loader, Search } from "lucide-react";

import TasksList from "./TasksList";
import ProfileBar from "./ProfileBar";
import TasksFiltersBar from "./TasksFiltersBar";
import CreateNewTaskButton from "./CreateNewTaskButton";
import NoActiveTasksMessage from "./NoActiveTasksMessage";

import useTasksSearchParms from "@/hooks/useTasksSearchParams";

import { useGetTasks } from "./useGetTasks";
import useDebounce from "./useTasksSearch";

const Tasks = () => {
  const { status, keyword, searchParams, setSearchParams } =
    useTasksSearchParms();

  const { data, isPending, error } = useGetTasks({ status, keyword });

  const { searchTerm, setSearchTerm, onChange } = useDebounce();

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

  const handleDeleteSearchTaskKeyword = () => {
    setSearchTerm("");
    searchParams.delete("keyword");
    setSearchParams(searchParams);
  };

  const noActiveTasks = data?.tasks?.length === 0;

  return (
    <div className="min-h-screen mt-10 sm:mt-20 mb-10 px-2 sm:px-0">
      <div className="flex flex-col items-center justify-center gap-y-5 mx-auto transition-all max-w-[600px] sm:w-[500px] relative bg-[#E8F1FD] rounded-[12px] p-5 pb-8">
        <ProfileBar />

        <div className="w-full relative">
          <input
            value={searchTerm}
            placeholder="Search for notes"
            onChange={onChange}
            className="w-full shadow-insetInputShadow bg-white h-[36px] pl-2 rounded-sm placeholder:text-[#B0B0B0] text-[12px] font-[400]"
          />

          {searchTerm ? (
            <CircleX
              onClick={handleDeleteSearchTaskKeyword}
              className="absolute top-[5px] right-[5px] size-6 text-white p-1 cursor-pointer rounded-[6px] bg-[#6A6CE0]"
            />
          ) : (
            <Search className="absolute top-[5px] right-[5px] size-6 text-white p-1 rounded-[6px] bg-[#6A6CE0]" />
          )}
        </div>

        <TasksFiltersBar noActiveTasks={noActiveTasks} />

        {noActiveTasks ? <NoActiveTasksMessage /> : null}

        <TasksList tasks={data?.tasks || []} />

        {status === "incomplete" ? <CreateNewTaskButton /> : null}
      </div>
    </div>
  );
};

export default Tasks;
