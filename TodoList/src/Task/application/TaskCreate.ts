import TaskRepository from '../domain/repository';

class TaskCreate {
    constructor(private repository : TaskRepository){
        //inicialización
    }
    async execute( title: string, description: string){
        return this.repository.create(title, description);
    }     
}

export default TaskCreate;