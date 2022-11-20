import { Module } from '@nestjs/common';

import { PersistanceModule } from '@/modules/persistance/persistance.module';

import { NoteController } from './note.controller';
import { NoteService } from './note.service';

@Module({
	imports: [PersistanceModule],
	controllers: [NoteController],
	providers: [NoteService],
})
export class NoteModule {}
