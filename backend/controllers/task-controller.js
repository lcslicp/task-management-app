import Task from '../models/Task.js';

//Create New Task
const addTask = async (req, res) =>{
    const { title, description, createdAt } = req.body;
    try {
        const task = new Task({
            title,
            description,
            createdAt
        });
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
const editTask = async (req, res) => {
    const { title, description, createdAt } = req.body;

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, {$set: req.body});

        if (task === null) {
            throw new Error('Task not found.');
        }
        task.title = title || task.title;
        task.description = description || task.description;

        res.status(200).json('Task updated.');
    } catch(error) {
        res.status(400).json({
            error: 'Edit unsuccessful, please try again.',
      message: error.message,
        });
    }
};

//Delete existing task
const deleteTask = async (req, res) => {
    try {
        await Task.findOneAndDelete(req.params.id);

        res.status(200).json('Task successfully deleted.');

        res.redirect('dashboard/:taskstatus');
    } catch(error) {
        res.status(400).json({
            error: 'Something went wrong, please try again.',
      message: error.message,
        });
    }
};

//GET all tasks
const getAllTasks = async (req, res) => {
    try {
       const tasks = await Task.find();
       res.json(tasks);
    } catch (error) {
        res.status(400).json({
            error: 'No tasks found.',
      message: error.message,
        })
    }

}

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
    getAllTasks,
    batchEditTasks,
    batchDeleteTasks,
  };
  
  export default TaskController;  


