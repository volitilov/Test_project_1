import express from 'express';

import * as UserController from '../controllers/user';


const router = express.Router();

// роут для получения текущего пользователя
router.get('/current-user', UserController.getCurrentUser);

export default router;