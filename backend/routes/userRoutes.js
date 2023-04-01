import { Router } from 'express';

import UserController from '../controllers/userController.js';
import upload from '../middleware/upload.js';

const router = Router();

router.post('/signup', UserController.signup);
router.post('/login', UserController.authenticateUser);
router.get('/user/:id', UserController.reqUser);
router.put(
  '/edit/user/:id',
  upload.single('userImage'),
  UserController.editUser
);
router.put('/edit/pwd/:id', UserController.updatePassword);

export default router;