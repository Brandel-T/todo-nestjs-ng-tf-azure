import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  displayName: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  picture: string;
}
