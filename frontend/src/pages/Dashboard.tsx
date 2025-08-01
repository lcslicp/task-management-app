import React, { useState, useEffect, useReducer } from "react";
import axios from "../api/axios";
import jwt_decode from "jwt-decode";
import { initialState, reducer } from "../reducers/loadingStates";
import { useNavigate } from "react-router-dom";

import TaskInput from "../components/TaskInput";
import Header from "../components/Header";
import TabNavigation from "../components/TabNavigation";
import Sidebar from "../components/Sidebar";

import ToDoTab from "../components/tab-components/ToDoTab";
import InProgressTab from "../components/tab-components/InProgressTab";
import CompletedTab from "../components/tab-components/CompletedTab";
import Task from "../components/Task";
import EditProfile from "../components/EditProfile";
import ChangePassword from "../components/ChangePassword";

import { Tasktype, TaskResponse, TabNavProps } from "../types/task";

const Dashboard = () => {
  const [todoTasks, setTodoTasks] = useState<Tasktype[]>([]);
  const [inProgressTasks, setInProgressTasks] = useState<Tasktype[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Tasktype[]>([]);
  const [priorityFilter, setPriorityFilter] = useState<string[]>([]);
  const [sort, setSort] = useState<string>("newest");

  const [taskId, setTaskId] = useState<string>("");
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [taskStatus, setTaskStatus] = useState<string>("");
  const [taskPriority, setTaskPriority] = useState<string>("");
  const [taskDue, setTaskDue] = useState<string>("");
  const [taskDate, setTaskDate] = useState<Date>(new Date());

  const [userId, setUserId] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [userImage, setUserImage] = useState<string>("");
  const [currentPwd, setCurrentPwd] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string>("");

  const [taskOpen, setTaskOpen] = useState<boolean>(false);
  const [profileModalOpen, setProfileModalOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState<boolean>(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const token = JSON.parse(localStorage.getItem("token") || "{}");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const decoded = jwt_decode(token) as { user: string };
  const decodedId = decoded.user;
  const TODO_TASK_URL = "/tasks/todo";
  const INPROGRESS_TASK_URL = "/tasks/inprogress";
  const COMPLETED_TASK_URL = "/tasks/completed";
  const USER_URL = `/user/${decodedId}`;

  const fetchTodoData = async () => {
    dispatch({ type: "SET_LOADING_TODOTAB" });
    try {
      const response = await axios.get(TODO_TASK_URL, config);
      setTodoTasks(response.data);
      dispatch({ type: "UNSET_LOADING_TODOTAB" });
    } catch (error) {
      console.error(error);
      dispatch({ type: "UNSET_LOADING_TODOTAB" });
    }
  };

  const fetchInProgresssData = async () => {
    dispatch({ type: "SET_LOADING_INPOGRESSTAB" });
    try {
      const response = await axios.get(INPROGRESS_TASK_URL, config);
      setInProgressTasks(response.data);
      dispatch({ type: "UNSET_LOADING_INPOGRESSTAB" });
    } catch (error) {
      console.error(error);
      dispatch({ type: "UNSET_LOADING_INPOGRESSTAB" });
    }
  };

  const fetchCompletedData = async () => {
    dispatch({ type: "SET_LOADING_COMPLETEDTAB" });
    try {
      const response = await axios.get(COMPLETED_TASK_URL, config);
      setCompletedTasks(response.data);
      dispatch({ type: "UNSET_LOADING_COMPLETEDTAB" });
    } catch (error) {
      console.error(error);
      dispatch({ type: "UNSET_LOADING_COMPLETEDTAB" });
    }
  };

  const fetchTasksData = async (id: string) => {
    dispatch({ type: "SET_LOADING_TASKMODAL" });
    try {
      const { data } = await axios.get(`/task/${id}`, config);
      const { _id, title, description, priority, status, dueDate, createdAt } =
        data;
      setTaskId(_id);
      setTaskTitle(title);
      setTaskDescription(description);
      setTaskPriority(priority);
      setTaskStatus(status);
      setTaskDue(dueDate);
      setTaskDate(createdAt);
      dispatch({ type: "UNSET_LOADING_TASKMODAL" });
    } catch (error) {
      console.error(error);
      dispatch({ type: "UNSET_LOADING_TASKMODAL" });
    }
  };

  const handleUpdate = (response: TaskResponse) => {
    const updatedTask: Tasktype = response.data.task;
    setTaskTitle(updatedTask.title);
    setTaskDescription(updatedTask.description);
    setTaskPriority(updatedTask.priority);
    setTaskStatus(updatedTask.status);
    setTaskDue(updatedTask.dueDate);
  };

  const addTodo = (newTask: Tasktype) => {
    setTodoTasks((prevState) => [...prevState, newTask]);
  };

  const addInProgress = (newTask: Tasktype) => {
    setInProgressTasks((prevState) => [...prevState, newTask]);
  };

  const addCompleted = (newTask: Tasktype) => {
    setCompletedTasks((prevState) => [...prevState, newTask]);
  };

  const updateTodo = (updatedTask: Tasktype) => {
    setTodoTasks((prevState) =>
      prevState.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      )
    );
  };

  const updateInProgress = (updatedTask: Tasktype) => {
    setInProgressTasks((prevState) =>
      prevState.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      )
    );
  };

  const updateCompleted = (updatedTask: Tasktype) => {
    setCompletedTasks((prevState) =>
      prevState.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      )
    );
  };

  const getUser = async () => {
    await axios.get(USER_URL, config).then((response) => {
      const { id, firstName, lastName, email, userImage, password } =
        response?.data;
      setUserId(id);
      setFirstName(firstName);
      setLastName(lastName);
      setEmail(email);
      setUserImage(userImage);
      setImagePreview(userImage);
    });
  };

  const handleTaskOpen = (id: string) => {
    fetchTasksData(id);
    setTaskOpen(true);
    navigate(`/${id}`);
  };

  const handleProfileModalClose = () => {
    setProfileModalOpen(false);
    navigate("/dashboard");
  };

  const sortOldest = () => {
    setSort("oldest");
  };

  const sortDueDate = () => {
    setSort("duedate");
  };

  useEffect(() => {
    fetchTodoData();
    fetchInProgresssData();
    fetchCompletedData();
  }, []);

  useEffect(() => {
    getUser();
  }, [firstName, lastName, email, userImage, currentPwd]);

  const tabdata = [
    {
      id: "1",
      key: "1",
      tabTitle: "TO DO",
      tabContent: (
        <ToDoTab
          status={taskStatus}
          todoTasks={todoTasks}
          setTodoTasks={setTodoTasks}
          setInProgressTasks={setInProgressTasks}
          setCompletedTasks={setCompletedTasks}
          priorityFilter={priorityFilter}
          loading={state.loadingTodoTab}
          handleTaskOpen={handleTaskOpen}
          sort={sort}
        />
      ),
    },

    {
      id: "2",
      key: "2",
      tabTitle: "IN PROGRESS",
      tabContent: (
        <InProgressTab
          status={taskStatus}
          inProgressTasks={inProgressTasks}
          setTodoTasks={setTodoTasks}
          setInProgressTasks={setInProgressTasks}
          setCompletedTasks={setCompletedTasks}
          priorityFilter={priorityFilter}
          sort={sort}
          handleTaskOpen={handleTaskOpen}
          loading={state.loadingInProgressTab}
        />
      ),
    },

    {
      id: "3",
      key: "3",
      tabTitle: "COMPLETED",
      tabContent: (
        <CompletedTab
          status={taskStatus}
          completedTasks={completedTasks}
          priorityFilter={priorityFilter}
          sort={sort}
          loading={state.loadingCompletedTab}
          setTodoTasks={setTodoTasks}
          setInProgressTasks={setInProgressTasks}
          setCompletedTasks={setCompletedTasks}
          handleTaskOpen={handleTaskOpen}
        />
      ),
    },
  ];

  const [activeStatusTab, setActiveStatusTab] = useState<string>(tabdata[0].id);

  return (
    <main className="flex flex-row w-full h-full">
      <aside
        className="bg-black fixed top-0 left-0 h-full w-[15%]"
        aria-label="Sidebar"
      >
        <Sidebar
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
          sort={sort}
          setSort={setSort}
          sortOldest={sortOldest}
          sortDueDate={sortDueDate}
        />
      </aside>

      <section className="flex flex-col w-[85%] ml-[15%]">
        <Header
          firstName={firstName}
          lastName={lastName}
          userImage={userImage}
          handleTaskOpen={handleTaskOpen}
        />
        <TabNavigation
          tabdata={tabdata}
          activeStatusTab={activeStatusTab}
          setActiveStatusTab={setActiveStatusTab}
        />
        <TaskInput
          title={taskTitle}
          setTaskTitle={setTaskTitle}
          description={taskDescription}
          setTaskDescription={setTaskDescription}
          status={taskStatus}
          setTaskStatus={setTaskStatus}
          priority={taskPriority}
          setTaskPriority={setTaskPriority}
          dueDate={taskDue}
          setTaskDue={setTaskDue}
          addTodo={addTodo}
          addInProgress={addInProgress}
          addCompleted={addCompleted}
        />

        <Task
          id={taskId}
          title={taskTitle}
          description={taskDescription}
          status={taskStatus}
          priority={taskPriority}
          dueDate={taskDue}
          createdAt={taskDate}
          taskOpen={taskOpen}
          setTaskOpen={setTaskOpen}
          onUpdate={handleUpdate}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          loading={state.loadingTaskModal}
          updateTodo={updateTodo}
          updateInProgress={updateInProgress}
          updateCompleted={updateCompleted}
          setTodoTasks={setTodoTasks}
          setInProgressTasks={setInProgressTasks}
          setCompletedTasks={setCompletedTasks}
        />
        <EditProfile
          handleProfileModalClose={handleProfileModalClose}
          profileModalOpen={profileModalOpen}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          email={email}
          setEmail={setEmail}
          userId={userId}
          setUserImage={setUserImage}
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
          setPasswordModalOpen={setPasswordModalOpen}
        />
        <ChangePassword
          userId={userId}
          passwordModalOpen={passwordModalOpen}
          setPasswordModalOpen={setPasswordModalOpen}
          setProfileModalOpen={setProfileModalOpen}
        />
      </section>
    </main>
  );
};

export default Dashboard;
