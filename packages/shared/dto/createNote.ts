import { IsBoolean, IsOptional, IsString } from 'class-validator';

export interface CreateNoteInput {
  name: string;
  body: string;
  isPublic: boolean;
}

export class CreateNoteDto implements CreateNoteInput  {
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
