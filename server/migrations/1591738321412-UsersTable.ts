import {MigrationInterface, QueryRunner, Table} from 'typeorm';
import { AUTH_TABLES } from '../src/auth/auth.constants';

export class UsersTable1591738321412 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: AUTH_TABLES.USERS,
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isGenerated: true,
                },
                {
                    name: 'username',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                    isUnique: true,
                },
                {
                    name: 'password',
                    type: 'text',
                    isNullable: false,
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(AUTH_TABLES.USERS);
    }

}
