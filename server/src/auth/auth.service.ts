import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import {
  ITokenData,
  IRegisterRequest,
  ILoginRequest,
  IRegisterStatus,
  IJWTPayload,
} from './auth.types';
import { EntityNotFoundError } from '../shared/common.errors';
import { ERROR_MESSAGES } from '../shared/common.constants';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../shared/services/users.service';
import { IUser } from '../shared/common.types';

@Injectable()
export class AuthService {
  private jwtSecretKey: string;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtSecretKey = this.configService.get('auth.jwtSecret');
  }

  async login(loginData: ILoginRequest): Promise<ITokenData> {
    try {
      const { login } = loginData;

      const user = await this.usersService.getUser({
        username: login,
      });

      if (!user) {
        throw new EntityNotFoundError(ERROR_MESSAGES.NOT_FOUND);
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...safeData } = user;
      const tokenData: ITokenData = this._createToken(safeData);

      return tokenData;
    } catch (e) {
      throw e;
    }
  }

  async signUp(registerData: IRegisterRequest): Promise<IRegisterStatus> {
    const registerStatus: IRegisterStatus = {
      success: true,
      message: 'User is registered.',
    };

    try {
      const { login, password } = registerData;

      await this.usersService.createUser({
        username: login,
        password: password,
      });

      return registerStatus;
    } catch (e) {
      registerStatus.success = false;
      registerStatus.message = e.message;
    }

    return registerStatus;
  }

  async validateUser(
    userData: Pick<IUser, 'username' | 'password'>,
  ): Promise<Omit<IUser, 'password'>> {
    try {
      const { username, password } = userData;

      const user = await this.usersService.getUser({ username });

      if (!user) {
        throw new EntityNotFoundError(ERROR_MESSAGES.NOT_FOUND);
      }

      const isValid = await bcrypt.compare(password, user.password);

      if (isValid) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: p, ...data } = user;

        return data;
      }

      return null;
    } catch (e) {
      throw e;
    }
  }

  public verifyToken(token: string): IJWTPayload {
    try {
      const data = jwt.verify(token, this.jwtSecretKey) as IJWTPayload;

      if (!data) {
        throw new UnauthorizedException(ERROR_MESSAGES.UNAUTHORIZED);
      }

      return data;
    } catch (e) {
      throw e;
    }
  }

  private _createToken(payload: IJWTPayload): ITokenData {
    const accessToken = this.jwtService.sign({ ...payload });

    return {
      payload,
      accessToken,
    };
  }
}
