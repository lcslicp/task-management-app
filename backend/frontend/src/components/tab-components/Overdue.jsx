import React, { useEffect, useState } from 'react';
import axios from 'axios';

// import TaskCard from '../TaskCard';
import EmptyState from '../ui-states/EmptyState';

const OverdueTab = () => {
//   const [overdueTasks, setOverdueTasks] = useState([]);

//   const fetchTasksData = async () => {
//     await axios.get('http://localhost:5000/tasks/').then((response) => {
//       setOverdueTasks(response.data);
//     });
//   };

//   useEffect(() => {
//     fetchTasksData();
//   }, []);

  return (
    <div>
     <EmptyState />
    </div>
  );
};

export default OverdueTab;
