import { ProductService } from '@/services/product.service'
import {
	EnumProductSort,
	TypePaginationProducts
} from '@/types/product.interface'
import { useQuery } from '@tanstack/react-query'
import { FC, useState } from 'react'
import Heading from '../Heading'
import Loader from '../Loader'
import SortDropdown from './SortDropdown'
import ProductItem from './product-item/ProductItem'
import Button from '../button/Button'

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

	if (isLoading) return <Loader />

	return (
		<section>
			{title && <Heading className='mb-5'>{title}</Heading>}
			<SortDropdown
				className='mb-5'
				sortType={sortType}
				setSortType={setSortType}
			/>
			{response.data.length ? (
				<>
					<div className='grid grid-cols-5 gap-10'>
						{response.data.map(product => (
							<ProductItem product={product} key={product.id} />
						))}
					</div>
					<div className='text-center mt-16'>
						{Array.from({ length: response.meta.lastPage }).map((_, index) => {
							const pageNumber = index + 1
							return (
								<Button
									key={pageNumber}
									size='sm'
									variant={page === pageNumber ? 'orange' : 'white'}
									onClick={() => setPage(pageNumber)}
									className='mx-1'
								>
									{pageNumber}
								</Button>
							)
						})}
					</div>
				</>
			) : (
				<div>Немає елементів</div>
			)}
		</section>
	)
}

export default CatalogPagination
