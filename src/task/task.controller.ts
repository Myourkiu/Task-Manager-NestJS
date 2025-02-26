import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { IFindAllTasksParams, Task } from 'src/models/task';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService){}
    @Post()
    create(@Body() task: Task){
        this.taskService.create(task)
    }

    @Get('/:id')
    findById(@Param('id') id: string) : Task{
        return this.taskService.findById(id);
    }

    @Get()
    findAll(@Query() params: IFindAllTasksParams) : Task[]{
        return this.taskService.findAll(params);
    }

    @Put()
    update(@Body() task: Task){
        this.taskService.update(task);
    }

    @Delete('/:id')
    remove(@Param('id') id:string){
        this.taskService.remove(id)
    }

}
