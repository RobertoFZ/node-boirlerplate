import { Entity, Column } from 'typeorm'
import { IsNotEmpty } from 'class-validator'
import bcrypt from 'bcryptjs'
import { EUserRoles } from 'types/User'
import { Model } from './Model'

@Entity('User')
export class User extends Model {
	@Column()
	firstName: string

	@Column()
	lastName: string

	@Column({ unique: true })
	email: string

	@Column({
		type: 'enum',
		enum: EUserRoles,
		default: EUserRoles.user,
	})
	role: EUserRoles

	@Column({ select: false })
	password: string

	hashPassword(): void {
		this.password = bcrypt.hashSync(this.password, 8)
	}

	checkIfUnencryptedPasswordIsValid(unencryptedPassword: string): boolean {
		return bcrypt.compareSync(unencryptedPassword, this.password)
	}
}
