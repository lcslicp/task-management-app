import Task from '../models/Task.js';

//Create New Task
const addTask = async ({ value }, res) =>{
    try {
        const task = new Task({ ...value.body });
        await task.save();

        res.status(201).json(task);
    } catch(error) {
        res.status(400).json({
            error: 'Something went wrong, please create task again.',
      message: error.message,

        });
    }
};

//Update existing Task
const editTask = async ({ params, value }, res) => {
    const { title, description, createdAt } = value.body;

    try {
        const task = await Task.findOne({ _id: params.id });

        if (task === null) {
            throw new Error('Task not found.');
        }
        task.title = title || task.title;
        task.description = description || task.description;
        task.createdAt = createdAt || task.createdAt;

        const updatedTask = await task.save();

        res.json(updatedTask);
    } catch(error) {
        res.status(400).json({
            error: 'Edit unsuccessful, please try again.',
      message: error.message,
        });
    }
};

//Delete existing task
const deleteTask = async ({ params }, res) => {
    try {
        await Task.findOneAndDelete({ _id:params.id });

        res.redirect('dashboard/:status');
    } catch(error) {
        res.status(400).json({
            error: 'Something went wrong, please try again.',
      message: error.message,
        });
    }
};

//Batch update task status
const batchEditTasks = async ({ params, value }, res) => {
    const { status } = value.body;
  
    try {
      const tasks = await Task.updateMany(
        {
          status: '',
        },
        {
          $set: {
            status: status,
          },
        }
      );
      const updatedTasks = await tasks.save();
  
      res.json(updatedTasks);
    } catch (e) {
      res.status(400).json({
        error: 'Something went wrong, please try again.',
        message: error.message,
      });
    }
  };
  
  //Delete tasks in bulk
  const batchDeleteTasks = async ({ params }, res) => {
    try {
      await Task.deleteMany({ _id: params.id });
  
      res.redirect('/dashboard/:status');
    } catch (e) {
      res.status(400).json({
        error: 'Something went wrong, please try again.',
        message: error.message,
      });
    }
  };
  
  const TaskController = {
    addTask,
    editTask,
    deleteTask,
    batchEditTasks,
    batchDeleteTasks,
  };
  
  export default TaskController;  


