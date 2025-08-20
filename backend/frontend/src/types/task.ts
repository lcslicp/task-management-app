import { Dispatch, SetStateAction } from "react";

export interface Tasktype {
  _id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  dueDate: string;
  createdAt: Date;
}

export interface TaskInputType extends Omit<Tasktype, "_id" | "createdAt"> {
  setTaskTitle: Dispatch<SetStateAction<string>>;
  setTaskDescription: Dispatch<SetStateAction<string>>;
  setTaskStatus: Dispatch<SetStateAction<string>>;
  setTaskPriority: Dispatch<SetStateAction<string>>;
  setTaskDue: Dispatch<SetStateAction<string>>;
  addTodo: (newTask: Tasktype) => void;
  addInProgress: (newTask: Tasktype) => void;
  addCompleted: (newTask: Tasktype) => void;
}

export interface TaskCardtype extends Omit<Tasktype, "_id"> {
  id: string;
  setTodoTasks: React.Dispatch<React.SetStateAction<Tasktype[]>>;
  setInProgressTasks: React.Dispatch<React.SetStateAction<Tasktype[]>>;
  setCompletedTasks: React.Dispatch<React.SetStateAction<Tasktype[]>>;
  handleTaskOpen: (id: string) => void;
  bgColor: string;
}

export interface CreateTasktype
  extends Omit<TaskCardtype, "bgColor" | "handleTaskOpen"> {
  taskOpen: boolean;
  setTaskOpen: Dispatch<SetStateAction<boolean>>;
  updateTodo: (updatedTask: Tasktype) => void;
  updateInProgress: (updatedTask: Tasktype) => void;
  updateCompleted: (updatedTask: Tasktype) => void;
  onUpdate: (response: TaskResponse) => void;
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
}

export interface TaskResponse {
  data: {
    task: Tasktype;
  };
}

export interface NavigationTab {
  sort: string;
  priorityFilter: string[];
  status: string;
  handleTaskOpen: (id: string) => void;
  loading: boolean;
  setTodoTasks: Dispatch<SetStateAction<Tasktype[]>>;
  setInProgressTasks: Dispatch<SetStateAction<Tasktype[]>>;
  setCompletedTasks: Dispatch<SetStateAction<Tasktype[]>>;
}

export interface ToDoTabtype extends NavigationTab {
  todoTasks: Tasktype[];
}

export interface InProgressTabtype extends NavigationTab {
  inProgressTasks: Tasktype[];
}

export interface CompletedTabtype extends NavigationTab {
  completedTasks: Tasktype[];
}

export interface Sidebartype {
  priorityFilter: string[];
  setPriorityFilter: Dispatch<SetStateAction<string[]>>;
  sort: string;
  setSort: Dispatch<SetStateAction<string>>;
  sortOldest: () => void;
  sortDueDate: () => void;
}

export interface TaskTab {
  id: string;
  key: string;
  tabTitle: string;
  tabContent: React.ReactNode;
}

export interface TabNavProps {
  tabdata: TaskTab[];
  activeStatusTab: string;
  setActiveStatusTab: Dispatch<SetStateAction<string>>;
}
