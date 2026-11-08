import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAmoTOkenTable1793861661206 implements MigrationInterface {
    name = 'AddAmoTOkenTable1793861661206'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "amo_token" ("id" character varying NOT NULL, "referer" character varying NOT NULL, "access_token" character varying NOT NULL, "refresh_token" character varying NOT NULL, "token_type" character varying NOT NULL DEFAULT 'Bearer', "expires_at" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_dd034e3734d2a1baa2935047017" UNIQUE ("referer"), CONSTRAINT "PK_bda9883cdea2616bed851ae82d1" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "amo_token"`);
    }

}
