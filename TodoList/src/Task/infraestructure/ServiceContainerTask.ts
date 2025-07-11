import TaskRepository from '../domain/repository'
import MongoTaskRepository from './MongoTaskRepository'
import CreateTask from '../application/TaskCreate'
import TaskGetAll from '../application/TaskGetAll'
import TaskGetById from '../application/TaskGetById'
import TaskUpdate from '../application/TaskUpdate'
import TaskDelete from '../application/TaskDelete'

class ServiceContainerTask {
    private static taskRepository: TaskRepository;

    static getTaskRepository(): TaskRepository {
        if(!this.taskRepository){
            this.taskRepository = new MongoTaskRepository()
        }
        return this.taskRepository
    }

    static getCreateTaskUseCase(): CreateTask {
        return new CreateTask(this.getTaskRepository());
    }

    static getAllTasksUseCase(): TaskGetAll{
        return new TaskGetAll(this.getTaskRepository())
    }

    static getTakByIdUseCase(): TaskGetById {
        return new TaskGetById(this.getTaskRepository())
    }

    static getTaskByIdUseCase(): TaskGetById {
        return new TaskGetById(this.getTaskRepository())
    }

    static getUpdateTaskUseCase(): TaskUpdate{
        return new TaskUpdate(this.getTaskRepository())
    }

    static getDeleteTaskUseCase(): TaskDelete {
        return new TaskDelete(this.getTaskRepository())
    }
}

export default ServiceContainerTask