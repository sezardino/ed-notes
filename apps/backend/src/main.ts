import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import session from 'express-session';
import passport from 'passport';

import { AppModule } from './modules/app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		cors: { origin: true, credentials: true, optionsSuccessStatus: 200 },
	});
	app.setGlobalPrefix('api');
	app.useGlobalPipes(new ValidationPipe());

	const configService = app.get(ConfigService);

	app.use(
		session({
			name: configService.get('SESSION_NAME'),
			secret: configService.get('SESSION_SECRET'),
			resave: false,
			saveUninitialized: false,
			cookie: {
				path: '/',
				httpOnly: true,
				secure: false,
				maxAge: 1000 * 60 * 15,
			},
		}),
	);
	app.use(passport.initialize());
	app.use(passport.session());

	await app.listen(4000);
}
bootstrap();
