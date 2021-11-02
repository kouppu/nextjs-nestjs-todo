import * as bcrypt from 'bcrypt';
import {
  Injectable,
  UnprocessableEntityException,
  HttpStatus,
} from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './dto';

const saltRounds = 10;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    protected readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ id: id });
    if (!user) {
      return null;
    }

    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ email: email });
    if (!user) {
      return null;
    }

    return user;
  }

  async create(user: CreateUserDTO): Promise<User> {
    if (await this.findOneByEmail(user.email)) {
      throw new UnprocessableEntityException({
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        messages: [
          {
            name: 'email',
            message: 'duplicate email address',
          },
        ],
      });
    }

    user.password = this.hashSync(user.password);
    return await this.userRepository.save(user);
  }

  private hashSync(data: string) {
    return bcrypt.hashSync(data, saltRounds);
  }
}
