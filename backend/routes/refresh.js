import { Router } from "express";

import RefreshTokenController from '../controllers/refreshTokenController.js';

const router = Router();

router.get('/refresh', RefreshTokenController);

export default router;