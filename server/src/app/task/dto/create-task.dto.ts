import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title: string;
}
