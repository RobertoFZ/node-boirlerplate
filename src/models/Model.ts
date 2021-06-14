import {
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	BaseEntity,
} from 'typeorm'

@Entity()
export class Model extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@CreateDateColumn({ default: 'NOW()' })
	public createdAt: Date

	@UpdateDateColumn({ onUpdate: 'NOW()', nullable: true })
	public updatedAt: Date

	@DeleteDateColumn()
	public deletedAt: Date
}
