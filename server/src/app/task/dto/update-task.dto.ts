import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDTO {
  @IsOptional()
  @IsString()
  @ApiProperty()
  title?: string;
}
