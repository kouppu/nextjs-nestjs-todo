import { Type } from 'class-transformer';
import { User } from '../../../entities/user.entity';
import { UserResponse } from './user.response';
import { ApiProperty } from '@nestjs/swagger';

export class UsersResponse {
  @Type(() => UserResponse)
  @ApiProperty({ type: UserResponse, isArray: true })
  users: User[];
}
