import express from 'express';
import {loginFunc, signup, getUser} from '../Controllers/userControllers.js';

const router = express.Router();

router.post('/login', loginFunc);
router.post('/signup', signup);
router.get('/users', getUser);
// router.get('/', getUser);


export default router;
