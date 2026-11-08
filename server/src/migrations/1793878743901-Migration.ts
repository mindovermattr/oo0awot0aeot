import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1793878743901 implements MigrationInterface {
    name = 'Migration1793878743901'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "amo_token" DROP CONSTRAINT "PK_bda9883cdea2616bed851ae82d1"`);
        await queryRunner.query(`ALTER TABLE "amo_token" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "amo_token" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "amo_token" ADD CONSTRAINT "PK_bda9883cdea2616bed851ae82d1" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "amo_token" DROP CONSTRAINT "PK_bda9883cdea2616bed851ae82d1"`);
        await queryRunner.query(`ALTER TABLE "amo_token" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "amo_token" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "amo_token" ADD CONSTRAINT "PK_bda9883cdea2616bed851ae82d1" PRIMARY KEY ("id")`);
    }

}
