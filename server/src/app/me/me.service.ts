import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/app/user/user.service';
import { DeleteResult } from 'typeorm';
import { UpdateMeDTO } from './dto';

@Injectable()
export class MeService extends UserService {
  async find(id: number): Promise<User> {
    const user = await this.findOneById(id);
    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async update(id: number, updateMeDTO: UpdateMeDTO): Promise<User> {
    const user = await this.findOneById(id);

    return await this.userRepository.save({ ...user, ...updateMeDTO });
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }
}
