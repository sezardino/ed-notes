import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { AuthDto, SessionUser } from 'shared';

import { Public, User } from '@/decorators';
import { LocalAuthGuard } from '@/guards';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Public()
	@Post('sign-up')
	signUp(@Body() dto: AuthDto) {
		return this.authService.signUp(dto);
	}

	@Public()
	@UseGuards(LocalAuthGuard)
	@HttpCode(HttpStatus.OK)
	@Post('sign-in')
	signIn(@User() user: SessionUser) {
		return user;
	}

	@HttpCode(HttpStatus.OK)
	@Get('/me')
	getHello(@User() user: SessionUser): SessionUser {
		return user;
	}

	@HttpCode(HttpStatus.OK)
	@Get('/logout')
	logout(@Request() req: ExpressRequest) {
		req.session.destroy((err) => console.log(err));
		return { message: 'The user session has ended' };
	}
}
