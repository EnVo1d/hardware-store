import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'

export class UserDto {
	@IsEmail()
	email: string

	@IsOptional()
	@IsString()
	@MinLength(6, { message: 'Password must be at least 6 characters long' })
	password: string

	@IsString()
	@IsOptional()
	name: string

	@IsOptional()
	@IsString()
	phone: string
}
