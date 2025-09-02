import React, { useMemo, useState } from "react";
import TaskCard from "../tasks/defaultTaskCard";
import EmptyState from "../ui-states/EmptyState";
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

  let sortedTasks = [...todoTasks];

  if (sort === "newest") {
    sortedTasks = [...todoTasks].sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  } else if (sort === "oldest") {
    sortedTasks = [...todoTasks].sort((a, b) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
  } else if (sort === "duedate") {
    sortedTasks = [...todoTasks].sort((a, b) => {
      if (a.dueDate === "" && b.dueDate === "") {
        return 0;
      } else if (a.dueDate === "") {
        return 1;
      } else if (b.dueDate === "") {
        return -1;
      } else {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
    });

    sortedTasks = sortedTasks
      .filter((task) => task.dueDate !== "Invalid Date")
      .concat(sortedTasks.filter((task) => task.dueDate === "Invalid Date"));
  }

  return (
    <div>
      {sortedTasks.length === 0 ||
      (priorityFilter.length === 0
        ? false
        : sortedTasks.filter((task) => priorityFilter.includes(task.priority))
            .length === 0) ? (
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
