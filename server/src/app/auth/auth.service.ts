import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/app/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from 'src/entities/user.entity';
import { LoginUserDTO } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginUserDTO: LoginUserDTO): Promise<any> {
    const user = await this.userService.findOneByEmail(loginUserDTO.email);
    if (user && bcrypt.compareSync(loginUserDTO.password, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async currentUser(payload: JwtPayload): Promise<User> {
    const user = await this.userService.findOneById(payload.user.id);
    if (!user) {
      return null;
    }

    return user;
  }

  async login(user: User) {
    const payload: JwtPayload = { user: { id: user.id, name: user.name } };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
