import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Todo List API working!');
})

app.listen(port, () =>{
    console.log(`Server llistening at http://localhost:${port}`)
})