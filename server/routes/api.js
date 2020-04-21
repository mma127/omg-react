import express from 'express';
import userRouter from './users';
import authRouter from './auth';
import companiesRouter from './companies';

const router = express.Router();

router.use('/companies', companiesRouter);
router.use('/users', userRouter);
router.use('/auth', authRouter);

export default router;
