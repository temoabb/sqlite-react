export interface TaskEntity {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
}

export type TaskStatus = "completed" | "incomplete";
