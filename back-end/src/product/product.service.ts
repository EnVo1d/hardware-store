import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma, Product } from '@prisma/client'
import { PaginationService } from 'src/pagination/pagination.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { generateSlug } from 'src/utils/generate-slug'
import {
	PaginateFunction,
	PaginatedResult,
	paginator
} from 'src/utils/paginator'
import { EnumProductSort, GetAllProductDto } from './dto/get-all.product.dto'
import { ProductDto } from './product.dto'
import {
	returnProductObject,
	returnProductObjectFullest
} from './return-product.object'

const paginate: PaginateFunction = paginator({ perPage: 10 })

@Injectable()
export class ProductService {
	constructor(
		private prisma: PrismaService,
		private pagination: PaginationService
	) {}

	async getAll(dto: GetAllProductDto = {}): Promise<PaginatedResult<Product>> {
		const { sort, searchTerm } = dto

		const prismaSort: Prisma.ProductOrderByWithRelationInput[] = []

		if (sort === EnumProductSort.LOW_PRICE) {
			prismaSort.push({ price: 'asc' })
		} else if (sort === EnumProductSort.HIGH_PRICE) {
			prismaSort.push({ price: 'desc' })
		} else if (sort === EnumProductSort.OLDEST) {
			prismaSort.push({ createdAt: 'asc' })
		} else {
			prismaSort.push({ createdAt: 'desc' })
		}

		const prismaSearchTermFilter: Prisma.ProductWhereInput = searchTerm
			? {
					OR: [
						{
							category: {
								name: {
									contains: searchTerm,
									mode: 'insensitive'
								}
							}
						},
						{
							name: {
								contains: searchTerm,
								mode: 'insensitive'
							}
						},
						{
							description: {
								contains: searchTerm,
								mode: 'insensitive'
							}
						}
					]
			  }
			: {}

		return paginate(
			this.prisma.product,
			{
				where: prismaSearchTermFilter,
				orderBy: prismaSort,
				select: returnProductObject
			},
			{
				page: dto.page
			}
		)

		// const { perPage, skip } = this.pagination.getPagination(dto)
		// const products = await this.prisma.product.findMany({
		// 	where: prismaSearchTermFilter,
		// 	orderBy: prismaSort,
		// 	skip,
		// 	take: perPage,
		// 	select: returnProductObject
		// })

		// return {
		// 	products,
		// 	length: await this.prisma.product.count({
		// 		where: prismaSearchTermFilter
		// 	})
		// }
	}

	async byId(id: number) {
		const product = await this.prisma.product.findUnique({
			where: {
				id
			},
			select: returnProductObjectFullest
		})

		if (!product) throw new NotFoundException('Product not found')

		return product
	}

	async create() {
		const product = await this.prisma.product.create({
			data: {
				description: '',
				name: '',
				price: 0,
				slug: ''
			}
		})

		return product.id
	}

	async bySlug(slug: string) {
		const product = await this.prisma.product.findUnique({
			where: {
				slug
			},
			select: returnProductObjectFullest
		})

		if (!product) throw new NotFoundException('Product not found')

		return product
	}

	async byCategory(categorySlug: string) {
		const products = await this.prisma.product.findMany({
			where: {
				category: {
					slug: categorySlug
				}
			},
			select: returnProductObjectFullest
		})

		if (!products) throw new NotFoundException('Products not found')

		return products
	}

	async getSimilar(id: number) {
		const currentProduct = await this.byId(id)

		if (!currentProduct)
			throw new NotFoundException('Current product not found')

		const products = await this.prisma.product.findMany({
			where: {
				category: {
					name: currentProduct.category.name
				},
				NOT: {
					id: currentProduct.id
				}
			},
			orderBy: {
				createdAt: 'desc'
			},
			select: returnProductObject
		})

		return products
	}

	async update(id: number, dto: ProductDto) {
		return this.prisma.product.update({
			where: {
				id
			},
			data: {
				description: dto.description,
				price: dto.price,
				images: dto.images,
				name: dto.name,
				slug: generateSlug(dto.name),
				category: {
					connect: {
						id: dto.categoryId
					}
				}
			}
		})
	}

	async delete(id: number) {
		return this.prisma.product.delete({
			where: { id }
		})
	}
}
