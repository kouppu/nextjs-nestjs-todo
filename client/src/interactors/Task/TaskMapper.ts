import { TaskBody } from 'src/types/api/TaskBody';
import { Task } from 'src/types/domain/Task';

export default class TaskMapper {
  static taskBodyToTask = (body: TaskBody): Task => ({
    id: body.id,
    title: body.title,
    status: body.status,
    createdAt: body.createdAt,
    updatedAt: body.updatedAt,
  });
}
