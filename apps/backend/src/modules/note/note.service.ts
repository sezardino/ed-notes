import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/modules/persistance/persistance.service';

import { CreateNoteDto } from './dto/createNote.dto';
import { UpdateNoteDto } from './dto/updateNote.dto';

@Injectable()
export class NoteService {
	constructor(private readonly prismaService: PrismaService) {}

	async create(dto: CreateNoteDto, userId: string) {
		return this.prismaService.note.create({ data: { ...dto, ownerId: userId } });
	}

	async getOne(id: string) {
		return this.prismaService.note.findUnique({ where: { id } });
	}

	async getAll(ownerId: string) {
		return this.prismaService.note.findMany({ where: { ownerId } });
	}

	async update(dto: UpdateNoteDto, noteId: string, userId: string) {
		const note = await this.getOne(noteId);

		if (note.ownerId !== userId) return null;

		return this.prismaService.note.update({ where: { id: noteId }, data: dto });
	}

	async delete(noteId: string, userId: string) {
		const note = await this.getOne(noteId);

		if (note.ownerId !== userId) return null;

		return this.prismaService.note.delete({ where: { id: noteId } });
	}
}
