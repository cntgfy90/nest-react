import { Response as ExpressResponse } from 'express';
import {
  Controller,
  Post,
  Body,
  UseGuards,
  ConflictException,
  NotFoundException,
  Response,
  HttpStatus,
  Query,
  Get,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginRequest, RegisterRequest } from './auth.dto';
import { IRegisterStatus, ITokenData, IJWTPayload } from './auth.types';
import { EntityNotFoundError } from '../shared/common.errors';
import { LocalAuthGuard } from './local-auth.guard';
import { ERROR_MESSAGES } from '../shared/common.constants';

@Controller()
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @ApiOperation({
    description: 'Register new user',
    summary: 'User registration',
  })
  @ApiBody({
    type: RegisterRequest,
  })
  async signUp(@Body() registerDto: RegisterRequest): Promise<IRegisterStatus> {
    try {
      const registerStatus: IRegisterStatus = await this.authService.signUp(
        registerDto,
      );

      if (!registerStatus.success) {
        throw new ConflictException(ERROR_MESSAGES.CONFLICT);
      }

      return registerStatus;
    } catch (e) {
      throw e;
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiOperation({
    description: 'Sign in existing user',
    summary: 'Signs in user',
  })
  @ApiBody({
    type: LoginRequest,
  })
  async signIn(
    @Body() loginData: LoginRequest,
    @Response() res: ExpressResponse,
  ): Promise<ExpressResponse> {
    try {
      const token: ITokenData = await this.authService.login(loginData);

      return res
        .cookie('token', token)
        .send(token)
        .status(HttpStatus.OK);
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new NotFoundException(e.message);
      }

      throw e;
    }
  }

  @Get('/verifyToken')
  @ApiOperation({
    description: 'Verifies access token',
    summary: 'Access token verification',
  })
  @ApiQuery({
    name: 'accessToken',
    type: 'string',
    required: true,
  })
  verify(@Query('accessToken') token: string): IJWTPayload {
    try {
      const data = this.authService.verifyToken(token);

      return data;
    } catch (e) {
      throw e;
    }
  }
}
