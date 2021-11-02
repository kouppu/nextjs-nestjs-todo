import { Auth } from 'src/types/domain/Auth';
import { AuthBody } from 'src/types/api/AuthBody';

export default class AuthMapper {
  static authBodyToAuth = (body: AuthBody): Auth => ({
    accessToken: body.accessToken,
  });
}
