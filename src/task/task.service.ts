import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { IFindAllTasksParams, Task } from 'src/models/task';

@Injectable()
export class TaskService {
    private tasks:Task[] = []
    create(task:Task){
        this.tasks.push(task)
    }

    findById(id: string) : Task {
        const taskFound = this.tasks.find(t => t.id == id);

        if(taskFound == undefined)
            throw new NotFoundException(`Task with id ${id} not found`)

        return taskFound
    }

    findAll(params: IFindAllTasksParams) : Task[]{
        return this.tasks.filter(t => {
            let match = true;

            if(params.title != undefined && !t.title.includes(params.title)){
                match = false;
            }

            if(params.status != undefined && !t.status.includes(params.status)){
                match = false;
            }
            
            return match;
        })
    }

    update(task: Task){
        const taskIndex = this.tasks.findIndex(t => t.id === task.id)

        if(taskIndex >= 0){
            this.tasks[taskIndex] = task
            return;
        }

        throw new HttpException(`Task with id ${task.id} not found`, HttpStatus.BAD_REQUEST)
    }

    remove(id: string){
        const taskIndex = this.tasks.findIndex(t => t.id === id)

        if(taskIndex >= 0){
            this.tasks.splice(taskIndex, 1)
            return;
        }

        throw new HttpException(`Task with id ${id} not found`, HttpStatus.BAD_REQUEST)
    }

}
