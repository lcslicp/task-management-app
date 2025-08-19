import React from "react";

export interface TaskInterface {
  _id: string;
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
  searchResults: [];
  loading: boolean;
  error: string | null;
}

export interface tabDataInterface {
  id: string;
  key: string;
  tabTitle: string;
  numberOfCards: number;
  tabContent: React.ReactNode;
}

export interface TaskUIState {
  taskOpen: boolean;
  taskLoading: boolean;
}

export interface StatusUIState {
  statusMsg: string;
  statusDisplay: boolean;
  statusColor: string[];
}
