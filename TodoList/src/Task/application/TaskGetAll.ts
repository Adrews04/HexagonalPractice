import TaskRepository from '../domain/repository';

class TaskGetAll {
    constructor(private repository: TaskRepository){
        //inicialización
    }

    async execute() {
        return this.repository.findAll();
    }
}

export default TaskGetAll;