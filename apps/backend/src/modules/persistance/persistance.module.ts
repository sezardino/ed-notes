import { Module } from '@nestjs/common';

import { PrismaService } from './persistance.service';

@Module({
	providers: [PrismaService],
	exports: [PrismaService],
})
export class PersistanceModule {}
