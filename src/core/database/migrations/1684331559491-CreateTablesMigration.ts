import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablesMigration1684331559491 implements MigrationInterface {
  name = 'CreateTablesMigration1684331559491';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "child_nodes" ("nodeId" SERIAL NOT NULL, "name" character varying NOT NULL, "parentId" character varying NOT NULL, "previousSiblingId" character varying NOT NULL, "parentNodeId" integer, CONSTRAINT "PK_7084a464332409bc86dfa84215d" PRIMARY KEY ("nodeId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "nodes" ("nodeId" SERIAL NOT NULL, "name" character varying NOT NULL, "parentId" character varying NOT NULL, "previousSiblingId" character varying NOT NULL, CONSTRAINT "PK_c640eaec023e72cc715962918ad" PRIMARY KEY ("nodeId"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "child_nodes" ADD CONSTRAINT "FK_6a29934c46aa249d511e544527f" FOREIGN KEY ("parentNodeId") REFERENCES "nodes"("nodeId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "child_nodes" DROP CONSTRAINT "FK_6a29934c46aa249d511e544527f"`,
    );
    await queryRunner.query(`DROP TABLE "nodes"`);
    await queryRunner.query(`DROP TABLE "child_nodes"`);
  }
}
