import React from "react";
import { useSelector } from "react-redux";
import TaskCard from "../tasks/defaultTaskCard";
import EmptyState from "../ui-states/EmptyState";
import LoadingSpinner from "../ui-states/loadingSpinnerBlue";
import { RootState } from "../../app/store";

const InProgressTab = ({
  sort,
  priorityFilter,
}: {
  sort: string;
  priorityFilter: string[];
}) => {
  const inProgressTasks = useSelector(
    (state: RootState) => state.tasks.inProgressTasks
  );
  const loading = useSelector((state: RootState) => state.tasks.loading);

  let sortedTasks = [...inProgressTasks];

  if (sort === "newest") {
    sortedTasks = [...inProgressTasks].sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  } else if (sort === "oldest") {
    sortedTasks = [...inProgressTasks].sort((a, b) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
  } else if (sort === "duedate") {
    sortedTasks = [...inProgressTasks].sort((a, b) => {
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
      {loading ? (
        <div className="px-96 mx-40">
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
          return <TaskCard key={index} task={task} />;
        })
      )}
    </div>
  );
};

export default InProgressTab;
