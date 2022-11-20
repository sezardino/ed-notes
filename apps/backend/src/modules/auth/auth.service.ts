import { Injectable, NotAcceptableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { compare, genSalt, hash } from 'bcrypt';

import { UserService } from '../user/user.service';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
	constructor(private readonly userService: UserService, private readonly configService: ConfigService) {}

	async validateUser(dto: AuthDto) {
		const user = await this.userService.getUser(dto.username);

		if (!user) return null;

		const passwordMatch = await compare(dto.password, user.password);

		if (!passwordMatch) return null;

		return {
			userId: user.id,
			user: user.username,
		};
	}

	async signUp(dto: AuthDto) {
		const user = await this.userService.getUser(dto.username);

		if (user) throw new NotAcceptableException('User already exist');

		const hashSalt = await genSalt(Number(this.configService.get('AUTH_SALT') | 8));
		const hashPassword = await hash(dto.password, hashSalt);

		return this.userService.createUser({ username: dto.username, password: hashPassword });
	}
}
