import { Router } from 'express';

import UserController from '../controllers/user-controller.js';

const router = Router();

router.post('/signup', UserController.signup);
router.post('/login', UserController.authenticateUser);


export default router;
