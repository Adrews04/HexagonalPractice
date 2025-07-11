import TaskRepository from '../domain/repository';

class TaskGetById {
    constructor(private repository: TaskRepository){
        //inicialización
    }

    async execute(id: string){
        return this.repository.findById(id);
    }
}

export default TaskGetById;