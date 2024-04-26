import express from 'express';
import { login, signup } from '../controllers/authController';
// import upload from '../utils/multer';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

export default router;

