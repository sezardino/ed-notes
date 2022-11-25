import { IsNotEmpty, IsString } from 'class-validator';
import { IAuthDto } from 'shared';

export class AuthDto implements IAuthDto {
	@IsString()
	@IsNotEmpty()
	username: string;

	@IsString()
	@IsNotEmpty()
	password: string;
}
