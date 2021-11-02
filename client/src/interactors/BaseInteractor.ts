import axiosInstance from 'src/configs/axios';
import Axios from 'axios';

export type Headers = {
  Authorization?: string;
};

export default class BaseInteractor {
  private readonly client;
  private headers: Headers = {};

  constructor(token?: string) {
    this.client = axiosInstance;
    if (token) {
      this.setAuthorization(token);
    }
  }

  private setAuthorization(token: string) {
    this.headers.Authorization = `Bearer ${token}`;
  }

  protected paerseError(error: any) {
    if (!Axios.isAxiosError(error)) {
      throw Error('Undefined error.');
    }
    if (!error.response) {
      throw Error('Undefined error response.');
    }
    if (error.response.status === 500) {
      throw Error('Web api returned 500 status.');
    }

    return error.response;
  }

  protected async get(url: string) {
    return await this.client.get(url, { headers: this.headers });
  }

  protected async post(url: string, data?: any) {
    return await this.client.post(url, data, { headers: this.headers });
  }

  protected async patch(url: string, data?: any) {
    return await this.client.patch(url, data, { headers: this.headers });
  }

  protected async delete(url: string) {
    return await this.client.delete(url, { headers: this.headers });
  }
}
