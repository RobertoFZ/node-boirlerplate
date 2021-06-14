import { Entity, Column } from 'typeorm'
import { Model } from './Model'

@Entity('User')
export class User extends Model {
	@Column()
	firstName: string

	@Column()
	lastName: string

	@Column({ unique: true })
	email: string
}
