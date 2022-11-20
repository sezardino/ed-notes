import { Module } from '@nestjs/common';

import { PersistanceModule } from '../persistance/persistance.module';
import { UserService } from './user.service';

@Module({
	imports: [PersistanceModule],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule {}