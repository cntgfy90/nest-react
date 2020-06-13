import {MigrationInterface, QueryRunner, Table} from 'typeorm';
import { USERS_TABLES } from '../src/shared/common.constants';

export class UsersTable1591738321412 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: USERS_TABLES.USERS,
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
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
                {
                    name: 'createdAt',
                    type: 'time without time zone',
                    isNullable: false,
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updatedAt',
                    type: 'time without time zone',
                    isNullable: false,
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(USERS_TABLES.USERS);
    }

}
