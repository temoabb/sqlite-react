import TaskCard from "./TaskCard";

import { TaskEntity } from "./Tasks.config";

interface TasksListProps {
  completed: boolean;
  tasks: TaskEntity[];
}

const TasksList: React.FC<TasksListProps> = ({ tasks }) => {
  return (
    <>
      {tasks.map((task) => (
        <TaskCard key={task.id} {...task} />
      ))}
    </>
  );
};

export default TasksList;
