import Task from "../models/Task.js";

//Create New Task
const addTask = async (req, res) =>{
    const { title,
    description,
    status,
    priority,
    dueDate, 
    createdAt
 } = req.body;
 

    try {
        const task = new Task({
            user: req.user,
            title,
            description,
            status,
            priority,
            dueDate,
            createdAt
        });
        const userTask = await task.save();

        res.status(201).json(userTask);
    } catch(error) {
        res.status(400).json({
            error: 'Something went wrong, please create task again.',
      message: error.message,

        });
    }
};

//Update existing Task
const editTask = async (req, res) => {
    const { title, description, status, priority, dueDate } = req.body;

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, {$set: req.body});

        if (task === null) {
            throw new Error('Task not found.');
        }
        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;
        task.priority = priority || task.priority;
        task.dueDate = dueDate || task.dueDate;

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
       const tasks = await Task.find(
        // { user: req.user.id }
        ).sort({createdAt: 1});
       res.json(tasks);
    } catch (error) {
        res.status(400).json({
            error: 'No tasks found.',
      message: error.message,
        })
    }

}

//GET Todo Tasks
const getTodoTasks = async (req, res) => {
  try {
     const tasks = await Task.find({
        // user: req.user.id,
        status: "To Do", 
     });
     res.json(tasks);
  } catch (error) {
      res.status(400).json({
          error: 'No tasks found.',
    message: error.message,
      })
  }

}

//GET In Progress Tasks
const getInProgressTasks = async (req, res) => {
  try {
     const tasks = await Task.find({
        // user: req.user.id,
        status: "In Progress"
     });
     res.json(tasks);
  } catch (error) {
      res.status(400).json({
          error: 'No tasks found.',
    message: error.message,
      })
  }

}

//GET getCompleted Tasks
const getCompletedTasks = async (req, res) => {
  try {
     const tasks = await Task.find({
        // user: req.user.id,
        status: "Completed"
     });
     res.json(tasks);
  } catch (error) {
      res.status(400).json({
          error: 'No tasks found.',
    message: error.message,
      })
  }

}

//Batch update task status
// const batchEditTasks = async ({ params, value }, res) => {
//     const { status } = value.body;
  
//     try {
//       const tasks = await Task.updateMany(
//         {
//           status: '',
//         },
//         {
//           $set: {
//             status: status,
//           },
//         }
//       );
//       const updatedTasks = await tasks.save();
  
//       res.json(updatedTasks);
//     } catch (e) {
//       res.status(400).json({
//         error: 'Something went wrong, please try again.',
//         message: error.message,
//       });
//     }
//   };
  
//   //Delete tasks in bulk
//   const batchDeleteTasks = async ({ params }, res) => {
//     try {
//       await Task.deleteMany({ _id: params.id });
  
//       res.redirect('/dashboard/:status');
//     } catch (e) {
//       res.status(400).json({
//         error: 'Something went wrong, please try again.',
//         message: error.message,
//       });
//     }
//   };
  
  const TaskController = {
    addTask,
    editTask,
    deleteTask,
    getAllTasks,
    getTodoTasks,
    getInProgressTasks,
    getCompletedTasks,
    // batchEditTasks,
    // batchDeleteTasks,
  };
  
  export default TaskController;  


