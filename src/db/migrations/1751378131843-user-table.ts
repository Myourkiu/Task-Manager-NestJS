import { MigrationInterface, QueryRunner } from "typeorm";

export class UserTable1751378131843 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
        await queryRunner.query(`
            CREATE TABLE "user" (
                id uuid NOT NULL DEFAULT uuid_generate_v4(),
                username varchar(256) NOT NULL,
                password_hash varchar(512) NULL,
                CONSTRAINT user_pk_id PRIMARY KEY (id),
                CONSTRAINT user_un_username UNIQUE (username)
            );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS user;`)
    }

}
