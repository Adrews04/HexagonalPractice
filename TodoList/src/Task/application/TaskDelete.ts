import TaskRepository from '../domain/repository';

class TaskDelete{
    constructor(private repository: TaskRepository){
        //inicializacion
    }

    async execute(id: string){
        return this.repository.delete(id);
    }
}

export default TaskDelete;