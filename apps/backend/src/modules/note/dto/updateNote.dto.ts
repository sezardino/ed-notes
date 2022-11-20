import { Note } from '@prisma/client';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateNoteDto implements Pick<Note, 'name' | 'body' | 'categories' | 'isPublic'> {
	@IsOptional()
	@IsString()
	name: string;

	@IsString()
	@IsOptional()
	body: string;

	@IsString({ each: true })
	@IsOptional()
	categories: string[];

	@IsBoolean()
	@IsOptional()
	isPublic: boolean;
}
