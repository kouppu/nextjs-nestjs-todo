import { IsNotEmpty, IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetQueryTaskDTO {
  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty()
  status: number;
}
