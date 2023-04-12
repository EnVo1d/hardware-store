import { Module } from '@nestjs/common'
import { PaginationService } from 'src/pagination/pagination.service'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'

@Module({
	controllers: [ProductController],
	providers: [ProductService, PaginationService]
})
export class ProductModule {}
