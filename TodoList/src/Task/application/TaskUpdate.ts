import TaskRepository from '../domain/repository';
import Task from '../domain/task';

class TaskUpdate {
    constructor(private repository: TaskRepository){
        // Inicialización
    }

    async execute(task: Task){
        return this.repository.update(
            task.id,
            task.title,
            task.description
        );
    }
}

export default TaskUpdate;