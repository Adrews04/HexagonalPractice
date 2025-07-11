import Task from './task';

interface TaskRepository {
    findAll(): Promise<Task[] | null>;
    findById(id:string): Promise<Task | null>;
    create(title: string, description: string): Promise<Task>;
    update(id: string, title: string, content: string): Promise<Task | null>;
    delete(id: string): Promise<boolean>;
}

export default TaskRepository