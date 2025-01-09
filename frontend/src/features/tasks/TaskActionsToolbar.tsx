import { useState } from "react";
import { CircleCheck, PencilLine, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { useConfirm } from "@/hooks/useConfirm";
import useTasksSearchParams from "@/hooks/useTasksSearchParams";
import useUpdateTask from "./useUpdateTask";

import TaskFormDialog from "./TaskFormDialog";

import { TaskEntity } from "./Tasks.config";

const TaskActionsToolbar: React.FC<TaskEntity> = (task) => {
  const [openEdit, setOpenEdit] = useState(false);

  const { status, keyword } = useTasksSearchParams();

  const {
    mutate: updateTask,
    isPending,
    error,
  } = useUpdateTask({ status, keyword });

  const [ConfirmDeleteDialog, confirmDelete] = useConfirm(
    `Are you sure you want to delete task - ${task.title}?`,
    "This action is irreversible"
  );

  const [ConfirmMarkAsDoneDialog, confirmMarkAsDone] = useConfirm(
    `Are you sure you want to mark task "${task.title}" as ${
      status === "completed" ? "incomplete" : "done"
    }?`,
    ""
  );

  const handleEditTask = () => {
    if (task.isCompleted) return;
    setOpenEdit(true);
  };

  const handleDeleteTask = async () => {
    const ok = await confirmDelete();
    if (!ok) return;

    // console.log(task.id);
  };

  const handleMarkAsChecked = async () => {
    const ok = await confirmMarkAsDone();
    if (!ok) return;

    const { isCompleted, ...rest } = task;

    const updatedTask: TaskEntity = { isCompleted: !isCompleted, ...rest };

    updateTask(updatedTask, {
      onSuccess: () => {
        toast.success("Status updated successfully");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <>
      <TaskFormDialog prefill={task} open={openEdit} setOpen={setOpenEdit} />

      <ConfirmDeleteDialog />

      <ConfirmMarkAsDoneDialog />

      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          {!task.isCompleted ? (
            <Button size="sm" variant="ghost" onClick={handleEditTask}>
              <PencilLine className="cursor-pointer" size={20} />
            </Button>
          ) : null}

          <Button size="sm" variant="ghost" onClick={handleDeleteTask}>
            <Trash2 className="cursor-pointer text-red-500" size={20} />
          </Button>
        </div>

        <Button
          onClick={handleMarkAsChecked}
          size="sm"
          variant="ghost"
          className="flex items-center gap-x-1 px-2"
        >
          <span className="text-[#6C86A8]">
            {task.isCompleted ? "Completed" : "Mark completed"}
          </span>
          <span className="text-green-400">
            <CircleCheck size={20} />
          </span>
        </Button>
      </div>
    </>
  );
};

export default TaskActionsToolbar;
