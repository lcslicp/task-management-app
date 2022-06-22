import { Router } from "express";
import TaskController from '../controllers/task-controller.js';

const router = Router();

router.post('/compose/newtask', TaskController.addTask);
router.put('/edit/:id', TaskController.editTask);
router.delete('/:id', TaskController.deleteTask);
router.get('/tasks', TaskController.getAllTasks);
router.get('/tasks/todo', TaskController.getTodoTasks);
router.get('/tasks/inprogress', TaskController.getInProgressTasks);
router.get('/tasks/completed', TaskController.getCompletedTasks);

export default router;