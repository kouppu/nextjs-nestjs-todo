import BaseInteractor from 'src/interactors/BaseInteractor';
import AuthMapper from './AuthMapper';
import { Auth } from 'src/types/domain/Auth';
import { AuthBody } from 'src/types/api/AuthBody';

export default class AuthInteractor extends BaseInteractor {
  constructor() {
    super();
  }

  async login(email: string, password: string): Promise<Auth | false> {
    try {
      const res = await this.post('auth/login', { email, password });
      const body: AuthBody = res.data;

      return AuthMapper.authBodyToAuth(body);
    } catch (error) {
      this.paerseError(error);

      return false;
    }
  }
}
