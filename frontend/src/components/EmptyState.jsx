import React from 'react';

import taskIcon from '../assets/icons/task-icon.svg';

const EmptyState = () => {
  return <section className='flex flex-col place-items-center py-48'>
  
    <img src={taskIcon} className='w-32 h-auto' />
  <p className='text-xs font-bold text-grey opacity-70'>No tasks found.</p>
  
    
    
    </section>;
};

export default EmptyState;
