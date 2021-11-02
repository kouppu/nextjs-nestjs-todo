import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;

  @Exclude()
  email: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserResponse>) {
    Object.assign(this, partial);
  }
}
