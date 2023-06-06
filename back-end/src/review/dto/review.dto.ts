import { IsNumber, IsString, Max, Min } from 'class-validator'

export class ReviewDto {
	@IsNumber()
	@Min(0)
	@Max(5)
	rating: number

	@IsString()
	text: string
}
