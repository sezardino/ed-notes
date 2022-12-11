import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { compare, genSalt, hash } from 'bcrypt';
import { AuthDto, SessionUser } from 'shared';

import { UserService } from '@/modules/user';

@Injectable()
export class AuthService {
	constructor(private readonly userService: UserService, private readonly configService: ConfigService) {}

	async validateUser(email: string, password: string): Promise<SessionUser> {
		const user = await this.userService.getUser(email);

		if (!user) return null;

		const passwordMatch = await compare(password, user.password);

		if (!passwordMatch) return null;

		return {
			id: user.id,
			email: user.email,
			username: user.username,
		};
	}

	async signUp(dto: AuthDto) {
		const user = await this.userService.getUser(dto.email);

		if (user) throw new NotAcceptableException('User already exist');

		const hashSalt = await genSalt(Number(this.configService.get('AUTH_SALT') | 8));
		const hashPassword = await hash(dto.password, hashSalt);

		return this.userService.createUser({ email: dto.email, username: dto.username, password: hashPassword });
	}

	async getMe(email: string) {
		const user = this.userService.getUser(email);

		if (!user) throw new NotFoundException();

		return user;
	}
}
