import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { NoteModule } from './note/note.module';
import { PersistanceModule } from './persistance/persistance.module';
import { UserModule } from './user/user.module';

@Module({
	imports: [ConfigModule.forRoot(), PersistanceModule, UserModule, AuthModule, NoteModule],
})
export class AppModule {}
