export type TaskStatus = 'todo' | 'inprogress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'urgent'

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority
  createdAt: Date;
}