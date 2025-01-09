import React from "react";

import TaskCard from "./TaskCard";

import { TaskEntity } from "./Tasks.config";

interface TasksListProps {
  tasks: TaskEntity[];
}

const TasksList: React.FC<TasksListProps> = ({ tasks }) => {
  return (
    <div className="flex flex-col items-center gap-2 w-full">
      {tasks.map((task) => (
        <TaskCard key={task.id} {...task} />
      ))}
    </div>
  );
};

export default React.memo(TasksList);
