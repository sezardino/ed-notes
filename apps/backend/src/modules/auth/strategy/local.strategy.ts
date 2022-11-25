import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { IUser } from 'shared';

import { AuthService } from '@/modules/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authService: AuthService) {
		super();
	}

	async validate(username: IUser['username'], password: IUser['password']) {
		const userData = await this.authService.validateUser({ username, password });

		if (!userData) throw new UnauthorizedException();

		return userData;
	}
}
