import { Router } from "express";
import TaskController from '../controllers/taskController.js';
// import resolveUser from "../middleware/resolveUser.js";
import verifyJWT from "../middleware/veriryJWT.js";

const router = Router();

router.post('/compose/newtask', verifyJWT, TaskController.addTask);
router.put('/edit/:id', verifyJWT, TaskController.editTask);
router.delete('/:id',verifyJWT, TaskController.deleteTask);
router.get('/tasks', verifyJWT, TaskController.getAllTasks);
router.get('/tasks/todo', verifyJWT, TaskController.getTodoTasks);
router.get('/tasks/inprogress', verifyJWT, TaskController.getInProgressTasks);
router.get('/tasks/completed', verifyJWT, TaskController.getCompletedTasks);

export default router;