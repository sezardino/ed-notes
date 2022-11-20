import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { IUpdateNoteDto } from 'shared';

export class UpdateNoteDto implements IUpdateNoteDto {
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
