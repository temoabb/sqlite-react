import { useMutation, useQueryClient } from "@tanstack/react-query";

import apiInstance from "@/api/apiInstance";

import { TaskEntity } from "./Tasks.config";

import { TasksFilters } from "./useGetTasks";

interface MutationData {
  status: number;
  message: string;
}

const useUpdateTask = (filters: TasksFilters) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: updateTaskRequest,
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

export default useUpdateTask;

async function updateTaskRequest(task: TaskEntity): Promise<MutationData> {
  const { data } = await apiInstance.put(`/${task.id}`, {
    title: task.title,
    description: task.description,
    isCompleted: task.isCompleted,
  });

  return data;
}
