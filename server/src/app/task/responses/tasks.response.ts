import { Type } from 'class-transformer';
import { Task } from '../../../entities/task.entity';
import { TaskResponse } from './task.response';
import { ApiProperty } from '@nestjs/swagger';

export class TasksResponse {
  @Type(() => TaskResponse)
  @ApiProperty({ type: TaskResponse, isArray: true })
  tasks: Task[];
}
