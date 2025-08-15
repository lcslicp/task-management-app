import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCompletedData,
  fetchInprogressData,
  fetchTodoData,
} from "../features/tasks/tasksThunks";
import { AppDispatch, RootState } from "../app/store";
import { getUser } from "../features/auth/authThunks";
import TaskInput from "../components/tasks/TaskInput";
import Header from "../components/common/Header";
import TabNavigation from "../components/common/TabNavigation";
import Sidebar from "../components/common/Sidebar";
import ToDoTab from "../components/tabs/ToDoTab";
import InProgressTab from "../components/tabs/InProgressTab";
import CompletedTab from "../components/tabs/CompletedTab";
import EditProfile from "../components/auth/EditProfile";
import ChangePassword from "../components/auth/ChangePassword";
import TaskModal from "../components/tasks/TaskModal";
import StatusPopup from "../components/ui-states/StatusPopup";
import { tabDataInterface } from "../types/task";

const Dashboard = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [popup, setPopup] = useState<boolean>(false);
  const [profileModalOpen, setProfileModalOpen] = useState<boolean>(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState<boolean>(false);
  const [priorityFilter, setPriorityFilter] = useState<string[]>([]);
  const [sort, setSort] = useState<string>("newest");

  const UserData = useSelector((state: RootState) => state.user.userData);
  const { firstName, lastName, email, userImage } = UserData;
  const statusMsg = useSelector((state: RootState) => state.statusUI.statusMsg);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  let tabdata: tabDataInterface[] = [];
  const { todoTasks, inProgressTasks, completedTasks } = useSelector(
    (state: RootState) => state.tasks
  );

  tabdata = [
    {
      id: "1",
      key: "1",
      tabTitle: "Todo",
      numberOfCards: todoTasks.length,
      tabContent: <ToDoTab sort={sort} priorityFilter={priorityFilter} />,
    },
    {
      id: "2",
      key: "2",
      tabTitle: "In Progress",
      numberOfCards: inProgressTasks.length,
      tabContent: <InProgressTab sort={sort} priorityFilter={priorityFilter} />,
    },
    {
      id: "3",
      key: "3",
      tabTitle: "Completed",
      numberOfCards: completedTasks.length,
      tabContent: <CompletedTab sort={sort} priorityFilter={priorityFilter} />,
    },
  ];

  const [activeStatusTab, setActiveStatusTab] = useState<string>(tabdata[0].id);

  const handleProfileModalClose = () => {
    setProfileModalOpen(false);
    navigate("/dashboard");
  };

  useEffect(() => {
    dispatch(fetchTodoData());
    dispatch(fetchInprogressData());
    dispatch(fetchCompletedData());
  }, []);

  useEffect(() => {
    dispatch(getUser());
  }, [firstName, lastName, email, userImage]);

  return (
    <main className="flex flex-row w-full h-full">
      <aside
        className="bg-black fixed top-0 left-0 h-full w-[15%]"
        aria-label="Sidebar"
      >
        <Sidebar
          sort={sort}
          setSort={setSort}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
        />
      </aside>

      <section className="flex flex-col w-[85%] ml-[15%]">
        <Header />
        <TabNavigation
          popup={popup}
          setPopup={setPopup}
          activeStatusTab={activeStatusTab}
          setActiveStatusTab={setActiveStatusTab}
          tabdata={tabdata}
        />
        <TaskInput
          popup={popup}
          setPopup={setPopup}
          setActiveStatusTab={setActiveStatusTab}
        />
        <StatusPopup statusMsg={statusMsg} />
        <TaskModal
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          setActiveStatusTab={setActiveStatusTab}
        />
        <EditProfile
          handleProfileModalClose={handleProfileModalClose}
          profileModalOpen={profileModalOpen}
          setPasswordModalOpen={setPasswordModalOpen}
        />
        <ChangePassword
          passwordModalOpen={passwordModalOpen}
          setPasswordModalOpen={setPasswordModalOpen}
          setProfileModalOpen={setProfileModalOpen}
        />
      </section>
    </main>
  );
};

export default Dashboard;
