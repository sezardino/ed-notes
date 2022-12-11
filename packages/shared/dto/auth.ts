import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export interface AuthInput {
  email: string;
  username?: string;
  password: string;
}

export class AuthDto implements AuthInput {
	@IsString()
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsOptional()
	@IsString()
	username: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(6)
	password: string;
}
