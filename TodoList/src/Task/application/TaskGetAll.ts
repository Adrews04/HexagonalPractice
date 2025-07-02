import TaskRepository from '../domain/repository';

class TaskGetAll {
    constructor(private repository: TaskRepository){
        //inicialización
    }

    async execture() {
        return this.repository.findAll();
    }
}