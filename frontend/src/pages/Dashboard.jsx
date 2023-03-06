import React, { useState, useEffect, useReducer } from 'react';
import axios from '../api/axios';
import { initialState, reducer } from '../reducers/loadingStates';

import TaskInput from '../components/TaskInput';
import Header from '../components/Header';
import TabNavigation from '../components/TabNavigation';
import Sidebar from '../components/Sidebar';

import ToDoTab from '../components/tab-components/ToDoTab';
import InProgressTab from '../components/tab-components/InProgressTab';
import CompletedTab from '../components/tab-components/CompletedTab';
import OverdueTab from '../components/tab-components/Overdue';
import Task from '../components/Task';

const Dashboard = () => {
  const [todoTasks, setTodoTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [priorityFilter, setPriorityFilter] = useState([]);
  const [sort, setSort] = useState('newest');

  const [taskId, setTaskId] = useState();
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskStatus, setTaskStatus] = useState('');
  const [taskPriority, setTaskPriority] = useState('');
  const [taskDue, setTaskDue] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [taskOpen, setTaskOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  const token = JSON.parse(localStorage.getItem('token'));
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const TODO_TASK_URL = '/tasks/todo';
  const INPROGRESS_TASK_URL = '/tasks/inprogress';
  const COMPLETED_TASK_URL = '/tasks/completed';

  const fetchTodoData = async () => {
    dispatch({ type: 'SET_LOADING_TODOTAB' });
    try {
      const response = await axios.get(TODO_TASK_URL, config);
      setTodoTasks(response.data);
      dispatch({ type: 'UNSET_LOADING_TODOTAB' });
    } catch (error) {
      console.error(error);
      dispatch({ type: 'UNSET_LOADING_TODOTAB' });
    }
  };

  const fetchInProgresssData = async () => {
    dispatch({ type: 'SET_LOADING_INPOGRESSTAB' });
    try {
      const response = await axios.get(INPROGRESS_TASK_URL, config);
      setInProgressTasks(response.data);
      dispatch({ type: 'UNSET_LOADING_INPOGRESSTAB' });
    } catch (error) {
      console.error(error);
      dispatch({ type: 'UNSET_LOADING_INPOGRESSTAB' });
    }
  };

  const fetchCompletedData = async () => {
    dispatch({ type: 'SET_LOADING_COMPLETEDTAB' });
    try {
      const response = await axios.get(COMPLETED_TASK_URL, config);
      setCompletedTasks(response.data);
      dispatch({ type: 'UNSET_LOADING_COMPLETEDTAB' });
    } catch (error) {
      console.error(error);
      dispatch({ type: 'UNSET_LOADING_COMPLETEDTAB' });
    }
  };

  const fetchTasksData = async (id) => {
    dispatch({ type: 'SET_LOADING_TASKMODAL' });
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
      dispatch({ type: 'UNSET_LOADING_TASKMODAL' });
    } catch (error) {
      console.error(error);
      dispatch({ type: 'UNSET_LOADING_TASKMODAL' });
    }
  };

  const handleUpdate = (response) => {
    const updatedTask = response.data.task;
    setTaskTitle(updatedTask.title);
    setTaskDescription(updatedTask.description);
    setTaskPriority(updatedTask.priority);
    setTaskStatus(updatedTask.status);
    setTaskDue(updatedTask.dueDate);
  };

  const addTodo = (newTask) => {
    setTodoTasks((prevState) => [...prevState, newTask]);
  };

  const addInProgress = (newTask) => {
    setInProgressTasks((prevState) => [...prevState, newTask]);
  };

  const addCompleted = (newTask) => {
    setCompletedTasks((prevState) => [...prevState, newTask]);
  };

  const sortOldest = () => {
    setSort('oldest');
  };

  const sortDueDate = () => {
    setSort('duedate');
  };

  useEffect(() => {
    fetchTodoData();
    fetchInProgresssData();
    fetchCompletedData();
  }, []);

  const tabdata = [
    {
      id: '1',
      key: '1',
      tabTitle: 'TO DO',
      tabContent: (
        <ToDoTab
          todoTasks={todoTasks}
          priorityFilter={priorityFilter}
          sort={sort}
          taskOpen={taskOpen}
          setTaskOpen={setTaskOpen}
          fetchTasksData={fetchTasksData}
          setIsEditing={setIsEditing}
          loading={state.loadingTodoTab}
        />
      ),
    },

    {
      id: '2',
      key: '2',
      tabTitle: 'IN PROGRESS',
      tabContent: (
        <InProgressTab
          inProgressTasks={inProgressTasks}
          priorityFilter={priorityFilter}
          sort={sort}
          taskOpen={taskOpen}
          setTaskOpen={setTaskOpen}
          fetchTasksData={fetchTasksData}
          setIsEditing={setIsEditing}
          loading={state.loadingInProgressTab}
        />
      ),
    },

    {
      id: '3',
      key: '3',
      tabTitle: 'COMPLETED',
      tabContent: (
        <CompletedTab
          completedTasks={completedTasks}
          priorityFilter={priorityFilter}
          sort={sort}
          taskOpen={taskOpen}
          setTaskOpen={setTaskOpen}
          fetchTasksData={fetchTasksData}
          setIsEditing={setIsEditing}
          loading={state.loadingCompletedTab}
        />
      ),
    },

    { id: '4', key: '4', tabTitle: 'OVERDUE', tabContent: <OverdueTab /> },
  ];

  const [activeStatusTab, setActiveStatusTab] = useState(tabdata[0].id);

  return (
    <div className='flex flex-row'>
      <Sidebar
        activeStatusTab={activeStatusTab}
        todoTasks={todoTasks}
        inProgressTasks={inProgressTasks}
        completedTasks={completedTasks}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        sort={sort}
        setSort={setSort}
        sortOldest={sortOldest}
        sortDueDate={sortDueDate}
      />
      <div className='flex flex-col w-full'>
        <Header />
        <TabNavigation
          tabdata={tabdata}
          activeStatusTab={activeStatusTab}
          setActiveStatusTab={setActiveStatusTab}
        />
        <TaskInput
          taskTitle={taskTitle}
          setTaskTitle={setTaskTitle}
          taskDescription={taskDescription}
          setTaskDescription={setTaskDescription}
          taskStatus={taskStatus}
          setTaskStatus={setTaskStatus}
          taskPriority={taskPriority}
          setTaskPriority={setTaskPriority}
          taskDue={taskDue}
          setTaskDue={setTaskDue}
          addTodo={addTodo}
          addInProgress={addInProgress}
          addCompleted={addCompleted}
        />

        <Task
          taskId={taskId}
          taskOpen={taskOpen}
          setTaskOpen={setTaskOpen}
          taskTitle={taskTitle}
          taskDescription={taskDescription}
          taskStatus={taskStatus}
          taskPriority={taskPriority}
          taskDue={taskDue}
          taskDate={taskDate}
          onUpdate={handleUpdate}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          loading={state.loadingTaskModal}
          addTodo={addTodo}
          addInProgress={addInProgress}
          addCompleted={addCompleted}
        />
      </div>
    </div>
  );
};

export default Dashboard;
