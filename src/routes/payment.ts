import {payment} from '../controllers/payment';
import express,{ Router } from 'express';


export const user:Router = Router();
user.use(express.json());
user.post('/checkout',payment);
