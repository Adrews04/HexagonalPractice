import mongoose from 'mongoose';
import TaskRepository from "../domain/repository";
import Task from "../domain/task";
import {RepositoryError} from "../../../shared/error";

//Mongoose schema for task
const taskSchema = new mongoose.Schema({
    id: {type: String, required: true, unique: true},
    title: { type: String, required: true},
    description: {type:String, required: true},
    completed: {type: Boolean, required: true},
    createdAt: {type:Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})

const TaskModel = mongoose.model('Task', taskSchema);

class MongoTaskRepository implements TaskRepository {
    async findAll(): Promise<Task [] | null> {
        try{
            const tasks = await TaskModel.find({}).lean();

            if(tasks.length === 0){
                return null;
            }

            return tasks.map(task=> new Task(
                task.id,
                task.title,
                task.description,
                task.completed,
                task.createdAt,
                task.updatedAt
            ))
        }catch (error){
            throw new RepositoryError(`Error finding all tasks: ${error}`)
        }
    }

    async findById(id: string): Promise<Task | null>{
        try{
            const task = await TaskModel.findOne({id}).lean();
            if(!task){
                return null;
            }

            return new Task(
                task.id,
                task.title,
                task.description,
                task.completed,
                task.createdAt,
                task.updatedAt
            )
        }catch(error){
            throw new RepositoryError(`Error finding task by id: ${error}`);
        }
    }

    async save(task: Task): Promise<Task> {
        try{
            const existingTask = await TaskModel.findOne({id: task.id});

            if(existingTask){
                const updatedTask = await TaskModel.findOneAndUpdate(
                    {id: task.id},
                    {
                        title: task.title,
                        description: task.description,
                        completed: task.completed,
                        updatedAt: new Date()
                    },
                    {new: true}
                ).lean();

                return new Task(
                    updatedTask!.id,
                    updatedTask!.title,
                    updatedTask!.description,
                    updatedTask!.completed,
                    updatedTask!.createdAt,
                    updatedTask!.updatedAt
                )
            }else{
                //Create
                const newTask = new TaskModel({
                    id: task.id,
                    title: task.title,
                    description: task.description,
                    completed: task.completed,
                    createdAt: task.createdAt,
                    updatedAt: task.updatedAt
                });

                const savedTask = await newTask.save();

                return new Task(
                    savedTask.id,
                    savedTask.title,
                    savedTask.description,
                    savedTask.completed,
                    savedTask.createdAt,
                    savedTask.updatedAt
                )
            }
        }catch(error){
            throw new RepositoryError(`Error saving task: ${error}`)
        }
    }

    async create(title: string, description: string): Promise<Task>{
        try{
            const id = new mongoose.Types.ObjectId().toString();
            const newTask = new TaskModel({
                id,
                title,
                description,
                completed: false,
                createdAt: Date.now(),
                updatedAt: Date.now()
            })
            const savedTask = await newTask.save();
            return new Task(
                savedTask.id,
                savedTask.title,
                savedTask.description,
                savedTask.completed,
                savedTask.createdAt,
                savedTask.updatedAt
            )

        }catch(error){
            throw new RepositoryError('Error creating task: Task not saved')
        }
    }

    async update(id: string, title: string, description: string): Promise<Task | null> {
        try{
            const updatedTask = await TaskModel.findOneAndUpdate(
                {id},
                {
                    title,
                    description,
                    updatedAt: new Date()
                },
                { new: true}
            ).lean();

            if(!updatedTask){
                return null;
            }

            return new Task(
                updatedTask.id,
                updatedTask.title,
                updatedTask.description,
                updatedTask.completed,
                updatedTask.createdAt,
                updatedTask.updatedAt
            )
        }catch(error){
            throw new RepositoryError(`Error updating task: ${error}`);
        }
    }


    async delete(id: string): Promise<boolean> {
        try{
            const result = await TaskModel.deleteOne({id})
            return result.deletedCount > 0;
            
        } catch(error){
            throw new RepositoryError(`Error deleting task: ${error}`)
        }
    }
}

export default MongoTaskRepository;