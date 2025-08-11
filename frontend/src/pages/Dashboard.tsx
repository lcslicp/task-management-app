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
import EditProfile from "../components/auth/EditProfile";
import ChangePassword from "../components/auth/ChangePassword";
import TaskModal from "../components/tasks/TaskModal";

const Dashboard = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [popup, setPopup] = useState<boolean>(false);
  const [profileModalOpen, setProfileModalOpen] = useState<boolean>(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState<boolean>(false);
  const UserData = useSelector((state: RootState) => state.user.userData);
  const { firstName, lastName, email, userImage } = UserData;
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

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
        <Sidebar />
      </aside>

      <section className="flex flex-col w-[85%] ml-[15%]">
        <Header />
        <TabNavigation popup={popup} setPopup={setPopup} />
        <TaskInput popup={popup} setPopup={setPopup} />

        <TaskModal isEditing={isEditing} setIsEditing={setIsEditing} />
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
