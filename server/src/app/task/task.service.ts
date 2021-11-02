import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { CreateTaskDTO, GetQueryTaskDTO, UpdateTaskDTO } from './dto';
import { Task, Status } from '../../entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async find(id: number, user: User): Promise<Task> {
    const task = await this.taskRepository.findOne({
      id: id,
      user: { id: user.id },
    });
    if (!task) {
      return null;
    }

    return task;
  }

  async findAll(user: User, query: GetQueryTaskDTO): Promise<Task[]> {
    return await this.taskRepository.find({
      relations: ['user'],
      where: { user: { id: user.id }, status: query.status },
      order: { createdAt: 'DESC' },
    });
  }

  async create(createTaskDTO: CreateTaskDTO, user: User): Promise<Task> {
    const task = new Task();
    task.user = user;
    const result = await this.taskRepository.save({
      ...task,
      ...createTaskDTO,
    });
    delete result.user;

    return result;
  }

  async update(
    id: number,
    updateTaskDTO: UpdateTaskDTO,
    user: User,
  ): Promise<Task> {
    const task = await this.find(id, user);

    return await this.taskRepository.save({ ...task, ...updateTaskDTO });
  }

  async delete(id: number, user: User): Promise<DeleteResult> {
    return await this.taskRepository.delete({ id: id, user: { id: user.id } });
  }

  async complete(id: number, user: User): Promise<Task> {
    const task = await this.find(id, user);
    task.status = Status.completed;

    return await this.taskRepository.save(task);
  }

  async initializeStatus(id: number, user: User): Promise<Task> {
    const task = await this.find(id, user);
    task.status = Status.needsAction;

    return await this.taskRepository.save(task);
  }
}
