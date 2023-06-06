import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { GetAllProductDto } from './dto/get-all.product.dto'
import { ProductDto } from './product.dto'
import { ProductService } from './product.service'

@Controller('products')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@UsePipes(new ValidationPipe())
	@Get()
	async getAll(@Query() dto: GetAllProductDto) {
		return await this.productService.getAll(dto)
	}

	@Get('similar/:id')
	async getSimilar(@Param('id') id: string) {
		return await this.productService.getSimilar(+id)
	}

	@Get('by-slug/:slug')
	async getProductBySlug(@Param('slug') slug: string) {
		return await this.productService.bySlug(slug)
	}

	@Get('by-slug-reviews/:slug')
	async getProductBySlugReviews(@Param('slug') slug: string) {
		return await this.productService.bySlugReviews(slug)
	}

	@Get('by-category/:categorySlug')
	async getProductsByCategory(@Param('categorySlug') categorySlug: string) {
		return await this.productService.byCategory(categorySlug)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	@Auth()
	async createProduct() {
		return await this.productService.create()
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	@Auth()
	async updateProduct(@Param('id') id: string, @Body() dto: ProductDto) {
		return await this.productService.update(+id, dto)
	}

	@HttpCode(200)
	@Delete(':id')
	@Auth()
	async deleteProduct(@Param('id') id: string) {
		return await this.productService.delete(+id)
	}

	@Get(':id')
	@Auth()
	async getProduct(@Param('id') id: string) {
		return await this.productService.byId(+id)
	}
}
