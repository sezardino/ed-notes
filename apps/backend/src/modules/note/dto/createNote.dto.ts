import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ICreateNoteDto } from 'shared';

export class CreateNoteDto implements ICreateNoteDto {
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
