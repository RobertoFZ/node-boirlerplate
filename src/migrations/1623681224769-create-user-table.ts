import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createUserTable1623681224769 implements MigrationInterface {
	name = 'createUserTable1623681224769'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'User',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment',
					},
					{
						name: 'firstName',
						type: 'varchar',
					},
					{
						name: 'lastName',
						type: 'varchar',
					},
					{
						name: 'email',
						type: 'varchar',
						isUnique: true,
					},
					{
						name: 'createdAt',
						type: 'timestamp',
						default: 'NOW()',
					},
					{
						name: 'updatedAt',
						type: 'timestamp',
						onUpdate: 'NOW()',
						isNullable: true,
					},
					{
						name: 'deletedAt',
						type: 'timestamp',
						isNullable: true,
					},
				],
			}),
			true,
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('User')
	}
}
