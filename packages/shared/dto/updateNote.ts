import { IsBoolean, IsOptional, IsString } from 'class-validator';

export interface UpdateNoteInput {
  name?: string;
  body?: string;
  categories?: string[];
  isPublic?: boolean;
}

export class UpdateNoteDto implements UpdateNoteInput {
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
