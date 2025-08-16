import React, { useMemo, useState } from "react";
import TaskCard from "../tasks/defaultTaskCard";
import EmptyState from "../ui-states/EmptyState";
import LoadingSpinner from "../ui-states/loadingSpinnerBlue";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const ToDoTab = ({
  sort,
  priorityFilter,
}: {
  sort: string;
  priorityFilter: string[];
}) => {
  const todoTasks = useSelector((state: RootState) => state.tasks.todoTasks);

  const sortedTasks = useMemo(() => {
    let tasks = [...todoTasks];
    if (sort === "newest") {
      tasks.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (sort === "oldest") {
      tasks.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    } else if (sort === "duedate") {
      tasks.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      });
    }
    return tasks;
  }, [todoTasks, sort]);

  const filteredTasks = useMemo(() => {
    if (priorityFilter.length === 0) return sortedTasks;
    return sortedTasks.filter((task) => priorityFilter.includes(task.priority));
  }, [sortedTasks, priorityFilter]);

  return (
    <div>
      {sortedTasks.length === 0 ? (
        <EmptyState />
      ) : (
        (priorityFilter.length === 0
          ? sortedTasks
          : sortedTasks.filter((task) => priorityFilter.includes(task.priority))
        ).map((task, index) => {
          return <TaskCard key={index} task={task} />;
        })
      )}
    </div>
  );
};

export default ToDoTab;
