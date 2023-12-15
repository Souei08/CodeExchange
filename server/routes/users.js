import express from 'express';
import {
  getUsers,
  registerUser,
  loginUser,
} from '../controller/users.controller.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/login', loginUser);
router.post('/create', registerUser);

export default router;
