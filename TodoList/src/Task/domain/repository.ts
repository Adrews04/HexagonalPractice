import {Task} from './task';

interface TaskRepository {
    findAll(): Promise<Task[]>;
    findById(id:number): Promise<Task | null>;
    create(task: Task): Promise<Task>;
    update(id: number, task: Task): Promise<Task | null>;
}

export default TaskRepository