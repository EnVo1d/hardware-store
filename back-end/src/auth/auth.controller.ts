import {
	Body,
	Controller,
	HttpCode,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'
import { RefreshTokenDto } from './dto/refresh-token.dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Post('register')
	async register(@Body() dto: AuthDto) {
		// const data = await this.authService.register(dto)
		// response.cookie('accessToken', data.accessToken, { maxAge: 60 * 60 * 1000 })
		// response.cookie('refreshToken', data.accessToken, {
		// 	maxAge: 30 * 24 * 60 * 60 * 1000,
		// 	httpOnly: true
		// })
		// return data.user
		return await this.authService.register(dto)
	}

	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Post('login')
	async login(@Body() dto: AuthDto) {
		// const data = await this.authService.login(dto)
		// response.cookie('accessToken', data.accessToken, { maxAge: 60 * 60 * 1000 })
		// response.cookie('refreshToken', data.accessToken, {
		// 	maxAge: 30 * 24 * 60 * 60 * 1000,
		// 	httpOnly: true
		// })
		// return data.user
		return await this.authService.login(dto)
	}

	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Post('refresh')
	async getNewTokens(@Body() dto: RefreshTokenDto) {
		// const data = await this.authService.getTokens(dto)
		// response.cookie('accessToken', data.accessToken, { maxAge: 60 * 60 * 1000 })
		// response.cookie('refreshToken', data.accessToken, {
		// 	maxAge: 30 * 24 * 60 * 60 * 1000,
		// 	httpOnly: true
		// })
		// return data.user
		return await this.authService.getTokens(dto)
	}
}
