import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { AuthenticatedGuard } from '@/guards';

import { AuthModule } from './auth';
import { NoteModule } from './note';
import { PrismaModule } from './prisma';
import { UserModule } from './user';

@Module({
	imports: [ConfigModule.forRoot(), PrismaModule, UserModule, AuthModule, NoteModule],
	providers: [
		{
			provide: APP_GUARD,
			useClass: AuthenticatedGuard,
		},
	],
})
export class AppModule {}
