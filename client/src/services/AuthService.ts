import AuthInteractor from 'src/interactors/Auth/AuthInteractor';

export default class AuthService {
  private readonly interactor: AuthInteractor;
  private readonly TOKEN_KEY = 'accessToken';

  constructor() {
    this.interactor = new AuthInteractor();
  }

  async login(email: string, password: string): Promise<boolean> {
    const result = await this.interactor.login(email, password);
    if (result === false) {
      return false;
    }
    localStorage.setItem(this.TOKEN_KEY, result.accessToken);

    return true;
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  getToken() {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (token === null) {
      return undefined;
    }

    return token;
  }
}
