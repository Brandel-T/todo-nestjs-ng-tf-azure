import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String })
  @IsOptional()
  description?: string;

  @ApiProperty({
    type: Boolean,
    default: false,
    description: 'Boolean value defining the state of the task',
  })
  @IsBoolean()
  done: boolean;

  @ApiProperty({ type: [String], required: false })
  @IsArray({ each: true })
  @IsOptional()
  subTaskIds?: string[];
}
