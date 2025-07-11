import express from 'express';
import { Request, Response } from 'express';
import ServiceContainerTask from './ServiceContainerTask';
import Task from '../domain/task';
import { v4 as uuidv4} from 'uuid';

const router = express.Router() as express.Router

router.get('/', async (_req: Request, res: Response) =>{
    try{
        const getGetAllTasksUseCase = ServiceContainerTask.getAllTasksUseCase();
        const tasks = await getGetAllTasksUseCase.execute();

        if(!tasks){
            res.status(404).json({message: 'No tasks found'});
        }

        else{
        res.status(200).json(tasks)
    }
    }catch (error){
        console.error('Error getting tasks:', error)
        res.status(500).json({message: 'internal server error'})
    }
})

router.get('/:id', async (req: Request, res: Response) =>{
    try{
        const{ id} = req.params;
        const getGetTaskByIdUseCase = ServiceContainerTask.getTaskByIdUseCase();
        const task = await getGetTaskByIdUseCase.execute(id);

        if(!task){
            res.status(404).json({message: 'Task not found'})
        }

        else{
            res.status(200).json(task);
        }
    }catch(error){
        console.error('Error getting task: ', error);
        res.status(500).json({message: 'Internal server error'})
    }
})

router.post('/', async (req: Request, res: Response) =>{
    try{
        const {title, description} = req.body;

        if(!title || !description){
            res.status(400).json({message: 'title and description are required'})
        }

        else{
            const createTaskUseCase = ServiceContainerTask.getCreateTaskUseCase()
            const task = new Task(
                uuidv4(),
                title,
                description,
                false,
                new Date(),
                new Date()
            )
            const createdTask = await createTaskUseCase.execute(task);
            res.status(201).json(createdTask);
        }
    }catch(error){
        console.error('Error creating task: ', error);
        res.status(500).json({message: 'Internal server error'})
    }
})

router.put('/:id', async (req: Request, res: Response) =>{
    try{
        const {id} = req.params;
        const {title, description, completed} = req.body;

        const getTaskByIdUseCase = ServiceContainerTask.getTaskByIdUseCase()
        const existingTask = await getTaskByIdUseCase.execute(id);

        if(!existingTask){
            res.status(404).json({message: 'Task not found'})
        }
        else{
        const updatedTask = new Task(
            id,
            title ?  title: existingTask.title,
            description || existingTask.description,
            completed !== undefined ? completed : existingTask.completed,
            existingTask.createdAt,
            new Date()
        )

        const updateTaskUseCase = ServiceContainerTask.getUpdateTaskUseCase()
        const result = await updateTaskUseCase.execute(updatedTask)

        res.status(200).json(result)
    }
    }catch(error){
        console.error('Error updateing task: ', error)
        res.status(500).json({message: 'Internal server error'})
    }
})

router.delete('/:id', async (req: Request, res: Response) =>{
    try{
        const { id } = req.params;
        const deleteTaskUseCase = ServiceContainerTask.getDeleteTaskUseCase();
        const result = await deleteTaskUseCase.execute(id)

        if(!result){
            res.status(404).json({message: 'Task not found'})
        }

        else{
            res.status(200).json({message: 'Task deleted successfully'})
        }
    } catch (error){
        console.error('Error deleting task: ', error)
        res.status(500).json({message: 'Internal server error'})
    }
})

export default router; 