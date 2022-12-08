import { IsNotEmpty, IsString } from 'class-validator';

export interface AuthInput {
  email: string;
  username: string;
  password: string;
}

export class AuthDto implements AuthInput {
	@IsString()
	@IsNotEmpty()
	email: string;

	@IsString()
	username: string;

	@IsString()
	@IsNotEmpty()
	password: string;
}
