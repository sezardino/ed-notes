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
	Query,
} from '@nestjs/common';
import { CreateNoteDto, Note, UpdateNoteDto } from 'shared';

import { UserId } from '@/decorators/user';

import { NoteService } from './note.service';

@Controller('note')
export class NoteController {
	constructor(private readonly noteService: NoteService) {}

	@Put('')
	create(@UserId() userId: string, @Body() dto: CreateNoteDto): Promise<Note> {
		return this.noteService.create(dto, userId);
	}

	@Get('all')
	getAll(
		@UserId() userId: string,
		@Query('search') search: string,
		@Query('page') page: string,
		@Query('limit') limit: string,
	): Promise<{ notes: Note[]; count: number }> {
		return this.noteService.getAll(userId, search, page, limit);
	}

	@Get(':id')
	async getOne(@UserId() userId: string, @Param('id') noteId: string): Promise<Note> {
		const note = await this.noteService.getOne(noteId);

		if (!note) throw new NotFoundException();

		if (!note.isPublic && note.ownerId !== userId) throw new NotAcceptableException();

		return note;
	}

	@Delete(':id')
	delete(@UserId() userId: string, @Param('id') noteId: string): Promise<Note> {
		return this.noteService.delete(noteId, userId);
	}

	@Patch(':id')
	update(@UserId() userId: string, @Param('id') noteId: string, @Body() dto: UpdateNoteDto): Promise<Note> {
		return this.noteService.update(dto, noteId, userId);
	}
}
