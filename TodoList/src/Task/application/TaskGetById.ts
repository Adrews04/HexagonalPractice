import TaskRepository from '../domain/repository';

class TaskGetById {
    constructor(private repository: TaskRepository){
        //inicialización
    }

    async execute(id: number){
        return this.repository.findById(id);
    }
}