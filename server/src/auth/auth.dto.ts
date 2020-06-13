import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ILoginRequest, IRegisterRequest } from './auth.types';

export class LoginRequest implements ILoginRequest {
  @ApiProperty({
    description: 'User login',
    required: true,
    type: 'string',
    example: 'joedoe',
  })
  login: string;

  @ApiProperty({
    description: 'User password',
    required: true,
    type: 'string',
    example: '123123123',
  })
  password: string;
}

export class RegisterRequest implements IRegisterRequest {
  @IsString()
  @MinLength(6)
  @ApiProperty({
    description: 'User login',
    required: true,
    type: 'string',
    example: 'joedoe',
  })
  login: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @ApiProperty({
    description: 'User password',
    required: true,
    type: 'string',
    example: '123123123',
  })
  password: string;
}
