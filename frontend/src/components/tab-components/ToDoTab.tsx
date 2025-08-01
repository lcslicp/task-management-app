import React from "react";

import TaskCard from "../task-cards/defaultTaskCard";
import EmptyState from "../ui-states/EmptyState";
import LoadingSpinner from "../ui-states/loadingSpinnerBlue";
import { ToDoTabtype } from "../../types/task";

const ToDoTab: React.FC<ToDoTabtype> = ({
  status,
  todoTasks,
  setTodoTasks,
  setInProgressTasks,
  setCompletedTasks,
  sort,
  priorityFilter,
  handleTaskOpen,
  loading,
}) => {
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

  const cardColors = [
    "bg-softerblue",
    "bg-softeryellow",
    "bg-softergreen",
    "bg-cardwhite",
  ];

  return (
    <div>
      {loading ? (
        <div className="px-10 mx-40">
          <LoadingSpinner />
        </div>
      ) : sortedTasks.length === 0 ||
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
          let dueDate = new Date(task.dueDate);
          let date = dueDate.toLocaleDateString("default", {
            month: "short",
            day: "numeric",
            year: "numeric",
          });

          const bgColorClass = cardColors[index % cardColors.length];

          return (
            <TaskCard
              id={task._id}
              key={task._id}
              title={task.title}
              description={task.description}
              priority={task.priority}
              status={task.status}
              dueDate={date}
              createdAt={task.createdAt}
              handleTaskOpen={handleTaskOpen}
              setTodoTasks={setTodoTasks}
              setInProgressTasks={setInProgressTasks}
              setCompletedTasks={setCompletedTasks}
              bgColor={bgColorClass}
            />
          );
        })
      )}
    </div>
  );
};

export default ToDoTab;
