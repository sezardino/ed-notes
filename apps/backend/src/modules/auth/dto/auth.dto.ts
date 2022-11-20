import { User } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto implements Pick<User, 'username' | 'password'> {
	@IsString()
	@IsNotEmpty()
	username: string;

	@IsString()
	@IsNotEmpty()
	password: string;
}
