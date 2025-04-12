import {webhook} from '../controllers/webhook';
import { Router } from 'express';
import bodyParser from 'body-parser';

export const rst:Router = Router();
rst.post('/webhook',bodyParser.raw({ type: 'application/json' }),webhook);
