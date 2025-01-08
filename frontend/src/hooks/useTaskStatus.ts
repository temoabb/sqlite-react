import { useSearchParams } from "react-router-dom";

import { TaskStatus } from "@/features/Tasks/Tasks.config";

const useTaskStatus = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  let status = searchParams.get("status") as TaskStatus;

  if (!(status === "completed" || status === "incomplete")) {
    status = "completed";
  }

  return {
    searchParams,
    setSearchParams,
    status,
  };
};

export default useTaskStatus;
