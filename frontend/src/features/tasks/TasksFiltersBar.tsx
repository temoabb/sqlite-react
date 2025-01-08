import { History, Calendar } from "lucide-react";

import useTaskStatus from "@/hooks/useTasksSearchParams";

import { TaskStatus } from "./Tasks.config";

import { cn } from "@/lib/utils";

const TasksFiltersBar = () => {
  const { status, searchParams, setSearchParams } = useTaskStatus();

  const handleSetType = (newStatus: TaskStatus) => {
    searchParams.set("status", newStatus);
    setSearchParams(searchParams);
  };

  const handleClearTasks = () => {};

  return (
    <div className="w-full flex justify-between items-end">
      <div className="flex items-center gap-x-2">
        <div className="flex flex-col items-center gap-y-1">
          <span className="text-[10px] text-[#30507D] font-[500]">Tasks</span>
          <Calendar
            className={cn(
              "size-8 cursor-pointer text-white rounded-[8px] p-1 hover:bg-[#7d7ed6] transition-all",
              status === "incomplete" ? "bg-[#6A6CE0]" : "bg-[#D8D8D8]"
            )}
            onClick={() => handleSetType("incomplete")}
          />
        </div>

        <div className="flex flex-col items-center gap-y-1">
          <span className="text-[10px] text-[#30507D] font-[500]">History</span>
          <History
            className={cn(
              "size-8 cursor-pointer text-white rounded-[8px] p-1 hover:bg-[#7d7ed6] transition-all",
              status === "completed" ? "bg-[#6A6CE0]" : "bg-[#D8D8D8]"
            )}
            onClick={() => handleSetType("completed")}
          />
        </div>
      </div>
      <span
        onClick={handleClearTasks}
        className="text-sm underline cursor-pointer border-b-0 text-[#30507D] hover:text-[#4a75b1] transition-all"
      >
        Clear all tasks
      </span>
    </div>
  );
};

export default TasksFiltersBar;
