import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTodoDto } from './create-todo.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  id: string;
}
