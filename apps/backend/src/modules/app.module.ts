import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth';
import { NoteModule } from './note';
import { PrismaModule } from './prisma';
import { UserModule } from './user';

@Module({
	imports: [ConfigModule.forRoot(), PrismaModule, UserModule, AuthModule, NoteModule],
})
export class AppModule {}
