import TaskRepository from '../domain/repository';
import Task from '../domain/task';

class TaskCreate {
    constructor(private repository : TaskRepository){
        //inicialización
    }
    async execute(task:Task){
        return this.repository.create(task.title, task.description);
    }     
}

export default TaskCreate;