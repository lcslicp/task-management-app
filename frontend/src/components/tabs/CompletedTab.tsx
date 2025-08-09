import React from "react";
import { useSelector } from "react-redux";
import TaskCard from "../tasks/defaultTaskCard";
import EmptyState from "../ui-states/EmptyState";
import LoadingSpinner from "../ui-states/loadingSpinnerBlue";
import { RootState } from "../../app/store";

const CompletedTab = () => {
  const completedTasks = useSelector(
    (state: RootState) => state.tasks.completedTasks
  );
  const sort = useSelector((state: RootState) => state.tasks.sort);
  const priorityFilter = useSelector(
    (state: RootState) => state.tasks.priorityFilter
  );
  const loading = useSelector((state: RootState) => state.tasks.loading);
  let sortedTasks = [...completedTasks];

  if (sort === "newest") {
    sortedTasks = [...completedTasks].sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  } else if (sort === "oldest") {
    sortedTasks = [...completedTasks].sort((a, b) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
  } else if (sort === "duedate") {
    sortedTasks = [...completedTasks].sort((a, b) => {
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
          const bgColorClass = cardColors[index % cardColors.length];
          return <TaskCard bgColor={bgColorClass} key={index} task={task} />;
        })
      )}
    </div>
  );
};

export default CompletedTab;
