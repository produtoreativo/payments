import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProduct1634903353546 implements MigrationInterface {
  name = 'CreateProduct1634903353546';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "produtos" ("id" SERIAL NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300) NOT NULL, "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedBy" character varying(300) NOT NULL, "internalComment" character varying(300), "name" character varying NOT NULL, "assessment" json, CONSTRAINT "PK_a5d976312809192261ed96174f3" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "produtos"`);
  }
}
