import { Router } from 'express';

import UserController from '../controllers/userController.js';
// import verifyJWT from '../middleware/veriryJWT.js';
import LogoutController from '../controllers/logoutController.js';

const router = Router();

router.post('/signup', UserController.signup);
router.post('/login', UserController.authenticateUser);
router.get('/user/:id', UserController.reqUser );
router.get('/logout', LogoutController);


export default router;
