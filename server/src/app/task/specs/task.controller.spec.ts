import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from '../task.controller';
import { Task } from '../../../entities/task.entity';
import { TaskService } from '../task.service';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('TaskController', () => {
  let controller: TaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        TaskService,
        {
          provide: getRepositoryToken(Task),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
