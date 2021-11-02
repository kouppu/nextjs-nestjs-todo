import {
  Request,
  Param,
  Body,
  Controller,
  Post,
  UseGuards,
  HttpCode,
  UseInterceptors,
  ClassSerializerInterceptor,
  Get,
  Patch,
  Delete,
  NotFoundException,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { User } from '../../entities/user.entity';
import { CreateTaskDTO, GetQueryTaskDTO, UpdateTaskDTO } from './dto';
import { TaskResponse, TasksResponse } from './responses';
import { Task } from '../../entities/task.entity';
import { TaskService } from './task.service';

@Controller('me/tasks')
@ApiTags('Task')
@ApiBearerAuth()
@ApiUnauthorizedResponse()
export class TaskController {
  constructor(private readonly service: TaskService) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @ApiOperation({ summary: 'Get authenticated user tasks' })
  @ApiQuery({ type: GetQueryTaskDTO })
  @ApiOkResponse({ type: TasksResponse })
  async index(
    @Request() req: { user: User },
    @Query() query: GetQueryTaskDTO,
  ): Promise<TasksResponse> {
    const tasks = await this.service.findAll(req.user, query);
    const res = new TasksResponse();
    res.tasks = tasks;

    return res;
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  @ApiOperation({ summary: 'Get authenticated user task' })
  @ApiOkResponse({ type: TaskResponse })
  @ApiNotFoundResponse()
  async findOne(
    @Request() req: { user: User },
    @Param('id') id: string,
  ): Promise<TaskResponse> {
    const task = await this.service.find(Number(id), req.user);
    if (!task) {
      throw new NotFoundException();
    }

    return new TaskResponse(task);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(201)
  @Post()
  @ApiOperation({ summary: 'Create authenticated user task' })
  @ApiBody({ type: CreateTaskDTO })
  @ApiCreatedResponse({ type: TaskResponse })
  @ApiUnprocessableEntityResponse()
  async create(
    @Request() req: { user: User },
    @Body() createTaskDTO: CreateTaskDTO,
  ): Promise<Task> {
    const task = await this.service.create(createTaskDTO, req.user);

    return new TaskResponse(task);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  @ApiOperation({ summary: 'Update authenticated user task' })
  @ApiBody({ type: UpdateTaskDTO })
  @ApiOkResponse({ type: TaskResponse })
  @ApiUnprocessableEntityResponse()
  async update(
    @Request() req: { user: User },
    @Param('id') id: string,
    @Body() updateTaskDTO: UpdateTaskDTO,
  ): Promise<Task> {
    const task = await this.service.update(Number(id), updateTaskDTO, req.user);

    return new TaskResponse(task);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(204)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete authenticated user task' })
  @ApiNoContentResponse()
  async delete(
    @Request() req: { user: User },
    @Param('id') id: string,
  ): Promise<void> {
    await this.service.delete(Number(id), req.user);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(200)
  @Post(':id/complete')
  @ApiOperation({ summary: 'Complete authenticated user task' })
  @ApiOkResponse({ type: TaskResponse })
  async complete(
    @Request() req: { user: User },
    @Param('id') id: string,
  ): Promise<Task> {
    const task = await this.service.complete(Number(id), req.user);

    return new TaskResponse(task);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(200)
  @Post(':id/initializeStatus')
  @ApiOperation({ summary: 'Initialize authenticated user task status' })
  @ApiOkResponse({ type: TaskResponse })
  async initializeStatus(
    @Request() req: { user: User },
    @Param('id') id: string,
  ): Promise<Task> {
    const task = await this.service.initializeStatus(Number(id), req.user);

    return new TaskResponse(task);
  }
}
