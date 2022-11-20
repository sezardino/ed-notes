import { Body, Controller, Get, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { AuthenticatedGuard } from './guard/authenticate.guard';
import { LocalAuthGuard } from './guard/local.auth.guard';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('sign-up')
	signUp(@Body() dto: AuthDto) {
		return this.authService.signUp(dto);
	}

	@UseGuards(LocalAuthGuard)
	@Post('sign-in')
	signIn(@Request() req) {
		return { user: req.user };
	}

	@UseGuards(AuthenticatedGuard)
	@Get('/protected')
	getHello(@Request() req): string {
		return req.user;
	}

	@Get('/logout')
	logout(@Request() req) {
		req.session.destroy();
		return { message: 'The user session has ended' };
	}
}
