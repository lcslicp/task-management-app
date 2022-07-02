import { Router } from 'express';

import LogoutController from '../controllers/logoutController.js';

const router = Router();

router.get('/logout', LogoutController);

export default router;