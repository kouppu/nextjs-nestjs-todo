import { Module } from '@nestjs/common';
import { Task } from '../../entities/task.entity';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [TaskController],
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [TaskService],
})
export class TaskModule {}
