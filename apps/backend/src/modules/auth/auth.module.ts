import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from '@/modules/user';
import { SessionSerializer } from '@/services';
import { LocalStrategy } from '@/strategies';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
	imports: [ConfigModule, UserModule, PassportModule.register({ session: true })],
	providers: [AuthService, LocalStrategy, SessionSerializer],
	controllers: [AuthController],
})
export class AuthModule {}
