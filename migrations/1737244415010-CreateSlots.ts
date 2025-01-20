import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSlots1737244415010 implements MigrationInterface {
    name = 'CreateSlots1737244415010'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "slots" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "time" TIMESTAMP NOT NULL, "cost" numeric(10,2) NOT NULL, "isReserved" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_8b553bb1941663b63fd38405e42" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "slots"`);
    }

}
