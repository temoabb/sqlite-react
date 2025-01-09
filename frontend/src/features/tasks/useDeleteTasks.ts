import { useMutation, useQueryClient } from "@tanstack/react-query";

import apiInstance from "@/api/apiInstance";

import { TasksFilters } from "./useGetTasks";

import { TaskStatus } from "./Tasks.config";

type TaskDeletionDetails = {
  id?: number;
  status?: TaskStatus;
};

const useDeleteTasks = (filters: TasksFilters) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteTasksRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "tasks",
          { status: filters.status, keyword: filters?.keyword || "" },
        ],
      });
    },
  });

  return { mutate, isPending };
};

export default useDeleteTasks;

async function deleteTasksRequest(tasks: TaskDeletionDetails) {
  const url = `?`;

  const idQuery = `id=${tasks.id}`;
  const statusQuery = `&status=${tasks.status === "completed" ? "1" : "0"}`;

  const { data } = await apiInstance.delete(
    url + `${tasks.id ? idQuery : ""}${tasks.status ? statusQuery : ""}`
  );

  return data;
}
