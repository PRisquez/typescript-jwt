import { Router } from 'express';
import { authToken } from '../middlewares/authorization';
import { login, profile, register } from '../controllers/auth.controller';

const router:Router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile',authToken, profile);

export default router;