import { Injectable } from '@nestjs/common';
import { CreateNoteInput, PaginationCount, UpdateNoteDto } from 'shared';

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

	async getAll(ownerId: string, search = '', page: string, limit = PaginationCount.default.toString()) {
		const limitNumber = Number(limit);
		const numberPage = Number(page);

		const pageQuery = {
			skip: (numberPage - 1) * limitNumber,
			take: limitNumber,
		};

		const searchQuery = {
			AND: [
				{
					ownerId,
				},
				{
					OR: [
						{
							name: {
								contains: search,
							},
						},
						{
							body: {
								contains: search,
							},
						},
						{
							categories: {
								has: search,
							},
						},
					],
				},
			],
		};

		const [count, notes] = await this.prismaService.$transaction([
			this.prismaService.note.count({ where: searchQuery }),
			this.prismaService.note.findMany({
				orderBy: { createdAt: 'asc' },
				...pageQuery,
				where: searchQuery,
			}),
		]);

		return { notes, count };
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
