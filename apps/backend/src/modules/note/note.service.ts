import { Injectable } from '@nestjs/common';
import { CreateNoteInput, UpdateNoteDto } from 'shared';

import { PrismaService } from '@/modules/prisma';

@Injectable()
export class NoteService {
	constructor(private readonly prismaService: PrismaService) {}

	async create(dto: CreateNoteInput, userId: string) {
		return this.prismaService.note.create({ data: { ...dto, ownerId: userId } });
	}

	async getOne(id: string) {
		return this.prismaService.note.findUnique({ where: { id } });
	}

	async getAll(ownerId: string) {
		return this.prismaService.note.findMany({ orderBy: { createdAt: 'asc' }, where: { ownerId } });
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
