import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class MeResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<MeResponse>) {
    Object.assign(this, partial);
  }
}
