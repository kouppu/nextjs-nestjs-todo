import { Exclude, Expose } from 'class-transformer';
import { User } from 'src/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class TaskResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  status: number;

  @Expose()
  statusName: string;

  @Exclude()
  user: User;

  constructor(partial: Partial<TaskResponse>) {
    Object.assign(this, partial);
  }
}
