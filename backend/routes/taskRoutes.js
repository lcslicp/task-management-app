import { Router } from "express";
import TaskController from '../controllers/task-controller.js';

const router = Router();

router.post('/compose/newtask', TaskController.addTask);
router.put('/edit/:id', TaskController.editTask);
router.delete('/:id', TaskController.deleteTask);
router.get('/tasks', TaskController.getAllTasks);

export default router;