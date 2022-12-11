import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthDto } from 'shared';

import { AuthenticatedGuard, LocalAuthGuard } from '@/guards';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('sign-up')
	signUp(@Body() dto: AuthDto) {
		return this.authService.signUp(dto);
	}

	@UseGuards(LocalAuthGuard)
	@HttpCode(HttpStatus.OK)
	@Post('sign-in')
	signIn(@Request() req) {
		return { user: req.user };
	}

	@UseGuards(AuthenticatedGuard)
	@Get('/me')
	getHello(@Request() req) {
		return req.user;
	}

	@Get('/logout')
	logout(@Request() req) {
		req.session.destroy();
		return { message: 'The user session has ended' };
	}
}
