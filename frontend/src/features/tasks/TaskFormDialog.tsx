import { useState } from "react";

import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";

import useTasksSearchParams from "@/hooks/useTasksSearchParams";
import useUpdateTask from "./useUpdateTask";

import { TaskEntity } from "./Tasks.config";
import useCreateTask from "./useCreateTask";

interface TaskFormModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  prefill: TaskEntity | null;
}

const TaskFormDialog: React.FC<TaskFormModalProps> = ({
  open,
  setOpen,
  prefill,
}) => {
  const [taskTitle, setTaskTitle] = useState(prefill?.title || "");

  const [taskDescription, setTaskDescription] = useState(
    prefill?.description || ""
  );

  const { status, keyword } = useTasksSearchParams();

  const { mutate: create, isPending: isCreating } = useCreateTask({
    status,
    keyword,
  });

  const { mutate: update, isPending: isUpdating } = useUpdateTask({
    status,
    keyword,
  });

  const isLoading = isCreating || isUpdating;

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!taskTitle.trim() || !taskDescription.trim()) {
      toast.error("Task title and description should not be an empty string");
      return;
    }

    if (prefill) {
      const { id, isCompleted } = prefill;

      const updatedTask: TaskEntity = {
        id,
        isCompleted,
        title: taskTitle,
        description: taskDescription,
      };

      update(updatedTask, {
        onSuccess: () => {
          toast.success("Task updated successfully");
          setOpen(false);
        },
        onError: (error) => {
          toast.error("Error updating a task: " + error.message);
        },
      });
    } else {
      create(
        {
          title: taskTitle,
          description: taskDescription,
          isCompleted: false,
        },
        {
          onSuccess: () => {
            toast.success("Task created successfully");
            setOpen(false);
          },
          onError: (error) => {
            toast.error("Error creating a task: " + error.message);
          },
        }
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a workspace</DialogTitle>
        </DialogHeader>
        <DialogDescription>{}</DialogDescription>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            value={taskTitle}
            disabled={isLoading}
            autoFocus
            required
            minLength={3}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="Task Name"
          />

          <Input
            value={taskDescription}
            disabled={isLoading}
            autoFocus
            required
            minLength={3}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="Type task details here"
          />

          <div className="flex justify-end">
            <Button
              disabled={isLoading}
              className="w-full bg-[#6A6CE0] hover:bg-[#7677d8]"
            >
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskFormDialog;
