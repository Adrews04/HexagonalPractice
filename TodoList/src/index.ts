import express from 'express';
import  taskRouter from './Task/infraestructure/ExpressTaskRouters';
import dotenv from 'dotenv';
import connectDB from './config/db';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use('/tasks', taskRouter);

app.listen(port, () =>{
    console.log(`Server llistening at http://localhost:${port}`)
})