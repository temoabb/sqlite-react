import { useMutation, useQueryClient } from "@tanstack/react-query";

import apiInstance from "@/api/apiInstance";

import { TaskEntity } from "./Tasks.config";

import { TasksFilters } from "./useGetTasks";

interface MutationData {
  status: number;
  message: string;
}

const useCreateTask = (filters: TasksFilters) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: createTaskRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "tasks",
          { status: filters.status, keyword: filters?.keyword || "" },
        ],
      });
    },
  });

  return {
    mutate,
    isPending,
    error,
  };
};

export default useCreateTask;

async function createTaskRequest(
  task: Omit<TaskEntity, "id">
): Promise<MutationData> {
  const { data } = await apiInstance.post("/", {
    title: task.title,
    description: task.description,
    isCompleted: task.isCompleted,
  });

  return data;
}
