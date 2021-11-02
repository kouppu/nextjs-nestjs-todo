import BaseInteractor from 'src/interactors/BaseInteractor';
import { ErrorBody } from 'src/types/api/ErrorBody';

export type CreateUserDTO = {
  name: string;
  email: string;
  password: string;
};

export default class UserInteractor extends BaseInteractor {
  constructor(token?: string) {
    super(token);
  }

  async create(data: CreateUserDTO) {
    try {
      await this.post('users', data);

      return true;
    } catch (error) {
      const response = this.paerseError(error);
      const body: ErrorBody = response.data;
      return body;
    }
  }
}
