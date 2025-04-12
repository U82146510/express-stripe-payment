import {payment} from '../controllers/payment';
import { Router } from 'express';

export const user:Router = Router();
user.post('/checkout',payment);
