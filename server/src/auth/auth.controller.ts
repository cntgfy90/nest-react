import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('auth')
export class AuthController {
  @Post('/signup')
  async signUp(): Promise<void> {
    try {
      return;
    } catch (e) {
      throw e;
    }
  }

  @Post('/login')
  async signIn(): Promise<void> {
    try {
      return;
    } catch (e) {
      throw e;
    }
  }
}
