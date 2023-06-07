import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class CategoryDto {
	@IsString()
	@IsNotEmpty()
	name: string

	@IsNumber()
	@IsOptional()
	generalCategory?: number
}
