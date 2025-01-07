import TaskCard from "./TaskCard";

import { TaskEntity } from "./Tasks.config";

interface TasksListProps {
  completed: boolean;
  tasks: TaskEntity[];
}

const TasksList: React.FC<TasksListProps> = ({ tasks }) => {
  return (
    <div className="flex flex-col gap-2">
      {tasks.map((task) => (
        <TaskCard key={task.id} {...task} />
      ))}
    </div>
  );
};

export default TasksList;
