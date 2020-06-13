import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '../shared/services/users.service';
import { User } from '../shared/entities/user.entity';
import { ERROR_MESSAGES } from '../shared/common.constants';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      imports: [
        PassportModule.register({
          defaultStrategy: 'jwt',
        }),
        JwtModule.register({
          secret: 'secret',
          signOptions: {
            expiresIn: '24h',
          },
        }),
      ],
      controllers: [AuthController],
      providers: [
        AuthService,
        ConfigService,
        UsersService,
        { provide: getRepositoryToken(User), useClass: Repository },
      ],
    }).compile();

    authController = app.get<AuthController>(AuthController);
    authService = app.get<AuthService>(AuthService);
  });

  describe('signUp', () => {
    const registerData = {
      login: 'login',
      password: 'password',
    };

    it('should return promise', () => {
      expect(authController.signUp(registerData)).toBeInstanceOf(Promise);
    });

    it('should correctly call service method for registration', async () => {
      const serviceResponse = {
        success: true,
        message: '',
      };

      const authServiceSignUp = jest
        .spyOn(authService, 'signUp')
        .mockResolvedValue(serviceResponse);

      await authController.signUp(registerData);
      expect(authServiceSignUp).toHaveBeenCalledTimes(1);
      expect(authServiceSignUp).toHaveBeenCalledWith(registerData);
      authServiceSignUp.mockReset();
    });

    it('should throw conflict exception', async () => {
      const serviceResponse = {
        success: false,
        message: '',
      };

      const authServiceSignUp = jest
        .spyOn(authService, 'signUp')
        .mockResolvedValue(serviceResponse);

      try {
        await authController.signUp(registerData);
      } catch (e) {
        expect(e).toBeInstanceOf(ConflictException);
        expect(e.message).toBe(ERROR_MESSAGES.CONFLICT);
      } finally {
        authServiceSignUp.mockReset();
      }
    });

    it('should throw server error', async () => {
      const authServiceSignUp = jest
        .spyOn(authService, 'signUp')
        .mockRejectedValue(null);

      try {
        await authController.signUp(registerData);
      } catch (e) {
        expect(e).toBeDefined();
      } finally {
        authServiceSignUp.mockReset();
      }
    });
  });
});
