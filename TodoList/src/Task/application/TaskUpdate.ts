import TaskRepository from '../domain/repository';

class TaskUpdate {
    constructor(private repository: TaskRepository){
        // Inicialización
    }

    async(id: number, title: string, content: string){
        return this.repository.update(id, title, content);
    }
}