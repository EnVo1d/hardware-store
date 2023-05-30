import { ProductService } from '@/services/product.service'
import {
	EnumProductSort,
	TypePaginationProducts
} from '@/types/product.interface'
import { useQuery } from '@tanstack/react-query'
import { FC, useState } from 'react'
import Heading from '../Heading'
import Loader from '../Loader'
import Button from '../button/Button'
import SortDropdown from './SortDropdown'
import ProductItem from './product-item/ProductItem'

interface ICatalogPagination {
	data: TypePaginationProducts
	title?: string
}

const CatalogPagination: FC<ICatalogPagination> = ({ data, title }) => {
	const [page, setPage] = useState(1)

	const [sortType, setSortType] = useState<EnumProductSort>(
		EnumProductSort.NEWEST
	)

	const { data: response, isLoading } = useQuery(
		['products', sortType, page],
		() =>
			ProductService.getAll({
				page,
				perPage: 10,
				sort: sortType
			}),
		{ initialData: data, keepPreviousData: true }
	)
	console.log(Array.from({ length: response.length / 10 }))
	if (isLoading) return <Loader />

	return (
		<section>
			{title && <Heading className='mb-5'>{title}</Heading>}
			<SortDropdown
				className='mb-5'
				sortType={sortType}
				setSortType={setSortType}
			/>
			{response.products.length ? (
				<>
					<div className='grid grid-cols-5 gap-10'>
						{response.products.map(product => (
							<ProductItem product={product} key={product.id} />
						))}
					</div>
					<div className='text-center mt-16'>
						{Array.from({ length: response.length / 10 }).map((_, index) => {
							const pageNumber = index + 1
							return (
								<Button
									key={pageNumber}
									size='sm'
									variant={page === pageNumber ? 'orange' : 'white'}
									onClick={() => setPage(pageNumber)}
									className='mx-3'
								>
									{pageNumber}
								</Button>
							)
						})}
					</div>
				</>
			) : (
				<div>There are no products</div>
			)}
		</section>
	)
}

export default CatalogPagination
