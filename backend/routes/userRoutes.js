import { Router } from 'express';

import UserController from '../controllers/userController.js';
import LogoutController from '../controllers/logoutController.js';

const router = Router();

router.post('/signup', UserController.signup);
router.post('/login', UserController.authenticateUser);
router.get('/logout', LogoutController);


export default router;
