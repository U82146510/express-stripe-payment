import express,{type Application} from 'express';
import {user} from './routes/payment';
import {error_handler} from './error/error_handler';
import { rst } from './routes/webhook';

const app:Application = express();
const port:number = 3000;

app.use('/api/payment',user);
app.use('/',rst);
app.use(error_handler);

const start = async()=>{
    try {
        app.listen(port,()=>console.log("On"))
    } catch (error) {
        console.error(error)
    }
};

start()