import React from "react";
import TaskCard from "../tasks/defaultTaskCard";
import EmptyState from "../ui-states/EmptyState";
import LoadingSpinner from "../ui-states/loadingSpinnerBlue";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const ToDoTab = () => {
  const todoTasks = useSelector((state: RootState) => state.tasks.todoTasks);
  const sort = useSelector((state: RootState) => state.tasks.sort);
  const priorityFilter = useSelector(
    (state: RootState) => state.tasks.priorityFilter
  );
  const loading = useSelector((state: RootState) => state.tasks.loading);

  let sortedTasks = [...todoTasks];

  if (sort === "newest") {
    sortedTasks = [...todoTasks].sort((a, b) => {
      return (
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
      );
    });
  } else if (sort === "oldest") {
    sortedTasks = [...todoTasks].sort((a, b) => {
      return (
        new Date(a.createdAt).getTime() -
        new Date(b.createdAt).getTime()
      );
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
        return (
          new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        );
      }
    });
    sortedTasks = sortedTasks
      .filter((task) => task.createdAt !== "Invalid Date")
      .concat(
        sortedTasks.filter((task) => task.dueDate === "Invalid Date")
      );
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
      ) : sortedTasks.length === 0 ? (
        <EmptyState />
      ) : (
        (priorityFilter.length === 0
          ? sortedTasks
          : sortedTasks.filter((task) =>
              priorityFilter.includes(task.priority)      
            )
        ).map((task, index) => {
          const bgColorClass = cardColors[index % cardColors.length];

          return <TaskCard bgColor={bgColorClass} key={index} task={task} />;
        })
      )}
    </div>
  );
};

export default ToDoTab;
