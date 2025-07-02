import TaskRepository from '../domain/repository';

class TaskDelete{
    constructor(private repository: TaskRepository){
        //inicializacion
    }

    async execute(id: number){
        return this.repository.delete(id);
    }
}