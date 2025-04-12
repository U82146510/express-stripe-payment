import express,{type Application} from 'express';
import {user} from './routes/payment';
import {error_handler} from './error/error_handler';

const app:Application = express();
const port:number = 3000;

app.use(express.json());
app.use('/api/payment',user);
app.use(error_handler);

const start = async()=>{
    try {
        app.listen(port,()=>console.log("On"))
    } catch (error) {
        console.error(error)
    }
};

start()