import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableNodesMigration1684336511155
  implements MigrationInterface
{
  name = 'CreateTableNodesMigration1684336511155';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "nodes" ("nodeId" SERIAL NOT NULL, "name" character varying NOT NULL, "parentId" integer, "previousSiblingId" character varying, CONSTRAINT "PK_c640eaec023e72cc715962918ad" PRIMARY KEY ("nodeId"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "nodes" ADD CONSTRAINT "FK_503fdd7971aa1a07e2823b552d9" FOREIGN KEY ("parentId") REFERENCES "nodes"("nodeId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "nodes" DROP CONSTRAINT "FK_503fdd7971aa1a07e2823b552d9"`,
    );
    await queryRunner.query(`DROP TABLE "nodes"`);
  }
}
