import { MeBody } from 'src/types/api/MeBody';
import { Me } from 'src/types/domain/Me';

export default class MeMapper {
  static meBodyToMe = (body: MeBody): Me => ({
    id: body.id,
    name: body.name,
    email: body.email,
    createdAt: body.createdAt,
    updatedAt: body.updatedAt,
  });
}
