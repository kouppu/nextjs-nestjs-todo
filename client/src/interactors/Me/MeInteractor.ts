import BaseInteractor from 'src/interactors/BaseInteractor';
import MeMapper from './MeMapper';
import { MeBody } from 'src/types/api/MeBody';

export default class MeInteractor extends BaseInteractor {
  constructor(token?: string) {
    super(token);
  }

  async getMe() {
    try {
      const res = await this.get('me');
      const body: MeBody = res.data;

      return MeMapper.meBodyToMe(body);
    } catch (error) {
      this.paerseError(error);
    }
  }
}
