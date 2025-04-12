import {payment} from '../controllers/payment';
import { Router } from 'express';
import bodyParser from 'body-parser';

export const user:Router = Router();
user.post('/checkout',payment);
