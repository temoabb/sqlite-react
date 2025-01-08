import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/useConfirm";
import { CircleCheck, PencilLine, Trash2 } from "lucide-react";
import { TaskEntity } from "./Tasks.config";

const TaskActionsToolbar: React.FC<TaskEntity> = ({
  id,
  // description,
  title,
  isCompleted,
}) => {
  const [ConfirmDeleteDialog, confirmDelete] = useConfirm(
    `Are you sure you want to delete task - ${title}?`,
    "This action is irreversible"
  );

  const [ConfirmMarkAsDoneDialog, confirmMarkAsDone] = useConfirm(
    `Are you sure you want to mark task: "${title}" as done?`,
    ""
  );

  const handleEditTask = () => {
    if (isCompleted) return;
    // console.log(id);
  };

  const handleDeleteTask = async () => {
    const ok = await confirmDelete();

    if (!ok) return;

    console.log(id);
  };

  const handleMarkAsChecked = async () => {
    const ok = await confirmMarkAsDone();

    if (!ok) return;
  };

  return (
    <>
      <ConfirmDeleteDialog />
      <ConfirmMarkAsDoneDialog />
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          {!isCompleted ? (
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
            {isCompleted ? "Completed" : "Mark completed"}
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
