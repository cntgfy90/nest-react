import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntityDuplicateEntry } from '../common.errors';
import { ERROR_MESSAGES } from '../common.constants';
import { User } from '../entities/user.entity';
import { IUser } from '../common.types';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  getUsers(): Promise<IUser[]> {
    return this.userRepository.find();
  }

  getUser(options: Partial<IUser>): Promise<IUser> {
    return this.userRepository.findOne(options);
  }

  async createUser(data: Pick<IUser, 'username' | 'password'>): Promise<IUser> {
    try {
      const { username, password } = data;

      const user = await this.userRepository.findOne({ username });

      if (user) {
        throw new EntityDuplicateEntry(ERROR_MESSAGES.CONFLICT);
      }

      const newUser: User = this.userRepository.create({
        username,
        password,
      });

      const result = await this.userRepository.save(newUser);

      return result;
    } catch (e) {
      throw e;
    }
  }
}
