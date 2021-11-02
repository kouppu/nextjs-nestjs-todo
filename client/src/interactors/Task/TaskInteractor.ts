import BaseInteractor from 'src/interactors/BaseInteractor';
import { TaskBody } from 'src/types/api/TaskBody';
import { Status, Task } from 'src/types/domain/Task';
import TaskMapper from './TaskMapper';
import { ErrorBody } from 'src/types/api/ErrorBody';

export type CreateTaskDTO = {
  title: string;
};

export default class TaskInteractor extends BaseInteractor {
  constructor(token?: string) {
    super(token);
  }

  async create(data: CreateTaskDTO) {
    try {
      const res = await this.post('me/tasks', data);
      const body: TaskBody = res.data;

      return TaskMapper.taskBodyToTask(body);
    } catch (error) {
      const response = this.paerseError(error);
      const body: ErrorBody = response.data;

      return body;
    }
  }

  async getTasks() {
    try {
      const res = await this.get(`me/tasks?status=${Status.needsAction}`);
      const body: TaskBody[] = res.data.tasks;

      const tasks: Task[] = [];
      body.forEach((task) => {
        tasks.push(TaskMapper.taskBodyToTask(task));
      });

      return tasks;
    } catch (error) {
      this.paerseError(error);
    }
  }

  async updateCompleted(id: number) {
    try {
      const res = await this.post(`me/tasks/${id}/complete`);
      const body: TaskBody = res.data;

      return TaskMapper.taskBodyToTask(body);
    } catch (error) {
      this.paerseError(error);
    }
  }

  async initializeStatus(id: number) {
    try {
      const res = await this.post(`me/tasks/${id}/initializeStatus`);
      const body: TaskBody = res.data;

      return TaskMapper.taskBodyToTask(body);
    } catch (error) {
      this.paerseError(error);
    }
  }

  async deleteTask(id: number) {
    try {
      await this.delete(`me/tasks/${id}`);

      return true;
    } catch (error) {
      this.paerseError(error);

      return false;
    }
  }
}
