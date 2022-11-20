import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from '@/modules/user/user.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SessionSerializer } from './session.serializer';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
	imports: [ConfigModule, UserModule, PassportModule.register({ session: true })],
	providers: [AuthService, LocalStrategy, SessionSerializer],
	controllers: [AuthController],
})
export class AuthModule {}
