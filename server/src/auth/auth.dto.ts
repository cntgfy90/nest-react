import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IAuthRequest } from './auth.types';

export class AuthRequest implements IAuthRequest {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @ApiProperty({
    description: 'User login',
    required: true,
    type: 'string',
  })
  login: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @ApiProperty({
    description: 'User password',
    required: true,
    type: 'string',
  })
  password: string;
}
