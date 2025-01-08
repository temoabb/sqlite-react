import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";

import { TaskEntity } from "./Tasks.config";

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

  const handleClose = () => {
    setOpen(false);
    // setWorkspaceName("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // mutate(
    //   {
    //     name: workspaceName,
    //   },
    //   {
    //     onSuccess: (workspaceId) => {
    //       toast.success("Workspace created");
    //       navigate("/")
    //       router.push(`/workspace/${workspaceId}`);
    //       handleClose();
    //     },
    //   }
    // );
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
            // disabled={isPending}
            autoFocus
            required
            minLength={3}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="Task Name"
          />

          <Input
            value={taskDescription}
            // disabled={isPending}
            autoFocus
            required
            minLength={3}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="Type task details here"
          />
          <div className="flex justify-end">
            <Button className="w-full bg-[#6A6CE0] hover:bg-[#7677d8]">
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskFormDialog;
