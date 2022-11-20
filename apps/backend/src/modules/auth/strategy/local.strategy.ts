import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Strategy } from 'passport-local';

import { AuthService } from '@/modules/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authService: AuthService) {
		super();
	}

	async validate(username: User['username'], password: User['password']) {
		const userData = await this.authService.validateUser({ username, password });

		if (!userData) throw new UnauthorizedException();

		return userData;
	}
}
