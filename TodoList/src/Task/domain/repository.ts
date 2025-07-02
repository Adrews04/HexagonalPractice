import {Task} from './task';

interface TaskRepository {
    findAll(): Promise<Task[]>;
    findById(id:number): Promise<Task | null>;
    create(title: string, description: string): Promise<Task>;
    update(id: number, title: string, content: string): Promise<Task | null>;
    delete(id: number): Promise<Task | null>;
}

export default TaskRepository