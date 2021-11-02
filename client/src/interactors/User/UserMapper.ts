import { UserBody } from 'src/types/api/UserBody';
import { User } from 'src/types/domain/User';

export default class UserMapper {
  static userBodyToUser = (body: UserBody): User => ({
    id: body.id,
    name: body.name,
    email: body.email,
    createdAt: body.createdAt,
    updatedAt: body.updatedAt,
  });
}
