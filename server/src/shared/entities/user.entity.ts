import * as bcrypt from 'bcrypt';
import {
  Entity,
  Column,
  Index,
  BeforeInsert,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { USERS_TABLES } from '../common.constants';

@Entity({ name: USERS_TABLES.USERS })
@Index(['username'], { unique: true })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: '255',
    nullable: false,
    unique: true,
  })
  username: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  password: string;

  @CreateDateColumn({
    type: 'time without time zone',
    default: 'CURRENT_TIMESTAMP',
  })
  createdAt: string;

  @UpdateDateColumn({
    type: 'time without time zone',
    default: 'CURRENT_TIMESTAMP',
  })
  updatedAt: string;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
