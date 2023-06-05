import {
	Body,
	Controller,
	Get,
	HttpCode,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { OrderDto } from './order.dto'
import { OrderService } from './order.service'

@Controller('orders')
export class OrderController {
	constructor(
		private readonly orderService: OrderService,
		private readonly configService: ConfigService
	) {}

	@Get()
	@Auth()
	@HttpCode(200)
	async getAll(@CurrentUser('id') userId: number) {
		return await this.orderService.getAll(userId)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	@Auth()
	async placeOrder(@CurrentUser('id') userId: number, @Body() dto: OrderDto) {
		return await this.orderService.placeOrder(dto, userId)
	}
}
