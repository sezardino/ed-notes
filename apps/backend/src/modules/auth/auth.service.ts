import { Injectable, NotAcceptableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { compare, genSalt, hash } from 'bcrypt';
import { AuthDto } from 'shared';

import { UserService } from '@/modules/user';

@Injectable()
export class AuthService {
	constructor(private readonly userService: UserService, private readonly configService: ConfigService) {}

	async validateUser(email: string, password: string) {
		const user = await this.userService.getUser(email);

		if (!user) return null;

		const passwordMatch = await compare(password, user.password);

		if (!passwordMatch) return null;

		return {
			userId: user.id,
			user: user.email,
		};
	}

	async signUp(dto: AuthDto) {
		const user = await this.userService.getUser(dto.email);

		if (user) throw new NotAcceptableException('User already exist');

		const hashSalt = await genSalt(Number(this.configService.get('AUTH_SALT') | 8));
		const hashPassword = await hash(dto.password, hashSalt);

		return this.userService.createUser({ email: dto.email, username: dto.username, password: hashPassword });
	}
}
