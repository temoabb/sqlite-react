import { useSearchParams } from "react-router-dom";

import { TaskStatus } from "@/features/Tasks/Tasks.config";

const useTasksSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get("keyword") || "";

  let status = searchParams.get("status") as TaskStatus;

  if (!(status === "completed" || status === "incomplete")) {
    status = "completed";
  }

  return {
    status,
    keyword,
    searchParams,
    setSearchParams,
  };
};

export default useTasksSearchParams;
