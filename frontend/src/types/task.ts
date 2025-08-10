export interface TaskInterface {
    taskId: string;
    title: string;
    description: string;
    priority: string;
    status: string;
    dueDate: string;
    createdAt: string;
}

export interface TasksInterface {
  todoTasks: TaskInterface[];
  inProgressTasks: TaskInterface[];
  completedTasks: TaskInterface[];
  priorityFilter: string[];
  sort: string;
  loading: boolean;
  error: string | null;
}

export interface TaskUIState {
  taskOpen: boolean;
  taskLoading: boolean;
}
