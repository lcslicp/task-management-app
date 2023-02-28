import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

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
  const [taskOpen, setTaskOpen] = useState(false);

  const [cardTitle, setCardTitle] = useState('');
  const [cardDescription, setCardDescription] = useState('');
  const [cardStatus, setCardStatus] = useState('');
  const [cardPriority, setCardPriority] = useState('');
  const [cardDue, setCardDue] = useState('');

  const token = JSON.parse(localStorage.getItem('token'));
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const TODO_TASK_URL = '/tasks/todo';
  const INPROGRESS_TASK_URL = '/tasks/inprogress';
  const COMPLETED_TASK_URL = '/tasks/completed';

  const fetchTodoData = async () => {
    await axios.get(TODO_TASK_URL, config).then((response) => {
      setTodoTasks(response.data);
    });
  };

  const fetchInProgresssData = async () => {
    await axios.get(INPROGRESS_TASK_URL, config).then((response) => {
      setInProgressTasks(response.data);
    });
  };

  const fetchCompletedData = async () => {
    await axios.get(COMPLETED_TASK_URL, config).then((response) => {
      setCompletedTasks(response.data);
    });
  };

  const fetchTasksData = async (id) => {
    const { data } = await axios.get(`/task/${id}`, config);
    const { title, description, priority, status, dueDate } = data;
    setCardTitle(title);
    setCardDescription(description);
    setCardPriority(priority);
    setCardStatus(status);
    setCardDue(dueDate);
    console.log('fetchTasksData called');
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
        />

        <Task
          taskId={taskId}
          taskOpen={taskOpen}
          setTaskOpen={setTaskOpen}
          cardTitle={cardTitle}
          cardDescription={cardDescription}
          cardStatus={cardStatus}
          cardPriority={cardPriority}
          cardDue={cardDue}
        />
      </div>
    </div>
  );
};

export default Dashboard;
