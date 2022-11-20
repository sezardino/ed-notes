import {
	Body,
	Controller,
	Delete,
	Get,
	NotAcceptableException,
	NotFoundException,
	Param,
	Patch,
	Put,
	UseGuards,
} from '@nestjs/common';

import { UserId } from '@/decorators/user';
import { AuthenticatedGuard } from '@/modules/auth/guard/authenticate.guard';

import { CreateNoteDto } from './dto/createNote.dto';
import { UpdateNoteDto } from './dto/updateNote.dto';
import { NoteService } from './note.service';

@Controller('note')
export class NoteController {
	constructor(private readonly noteService: NoteService) {}

	@UseGuards(AuthenticatedGuard)
	@Put('')
	create(@UserId() userId: string, @Body() dto: CreateNoteDto) {
		return this.noteService.create(dto, userId);
	}

	@UseGuards(AuthenticatedGuard)
	@Get('all')
	getAll(@UserId() userId: string) {
		return this.noteService.getAll(userId);
	}

	@Get(':id')
	async getOne(@UserId() userId: string, @Param('id') noteId: string) {
		const note = await this.noteService.getOne(noteId);

		if (!note) throw new NotFoundException();

		if (!note.isPublic && note.ownerId !== userId) throw new NotAcceptableException();

		return { note };
	}

	@UseGuards(AuthenticatedGuard)
	@Delete(':id')
	delete(@UserId() userId: string, @Param('id') noteId: string) {
		return this.noteService.delete(noteId, userId);
	}

	@UseGuards(AuthenticatedGuard)
	@Patch(':id')
	update(@UserId() userId: string, @Param('id') noteId: string, @Body() dto: UpdateNoteDto) {
		return this.noteService.update(dto, noteId, userId);
	}
}
