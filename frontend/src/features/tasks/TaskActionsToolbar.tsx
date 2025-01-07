import { Button } from "@/components/ui/button";
import { CircleCheck, PencilLine, Trash2 } from "lucide-react";

interface TaskActionsToolbarProps {
  isCompleted: boolean;
  taskId: number;
}

const TaskActionsToolbar: React.FC<TaskActionsToolbarProps> = ({
  isCompleted,
  taskId,
}) => {
  const handleEditTask = () => {
    if (isCompleted) return;
    console.log(taskId);
  };

  const handleDeleteTask = () => {
    console.log(taskId);
  };

  const handleMarkAsChecked = () => {};

  return (
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
  );
};

export default TaskActionsToolbar;
