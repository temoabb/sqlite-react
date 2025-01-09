import { useQuery } from "@tanstack/react-query";

import apiInstance from "@/api/apiInstance";

import { TaskEntity, TaskStatus } from "./Tasks.config";

export interface TasksFilters {
  status: TaskStatus;
  keyword?: string;
}

interface QueryData {
  tasks: TaskEntity[];
}

export const useGetTasks = (filters: TasksFilters) => {
  const { data, isPending, error } = useQuery({
    queryKey: [
      "tasks",
      { status: filters.status, keyword: filters?.keyword || "" },
    ],
    queryFn: () => getTasksRequest(filters),
  });

  return {
    data,
    isPending,
    error,
  };
};

async function getTasksRequest(filters: TasksFilters): Promise<QueryData> {
  const { status, keyword } = filters;

  const apiStatus = status === "completed" ? 1 : 0;

  let apiEndpoint = `?status=${apiStatus}`;

  if (keyword) {
    apiEndpoint += `&keyword=${keyword}`;
  }

  const { data } = await apiInstance.get(apiEndpoint);

  return data;
}
