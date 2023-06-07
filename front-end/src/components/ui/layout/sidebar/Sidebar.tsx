import { CategoryService } from '@/services/category.service'
import Loader from '@/ui/Loader'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import Category from './Category'
import DropdownCategory from './DropdownCategory'

const Sidebar: FC = () => {
	const { data, isLoading } = useQuery(
		['get categories'],
		() => CategoryService.getAll(),
		{
			select: ({ data }) => data
		}
	)
	console.log(data)

	return (
		<aside
			className='bg-secondary flex flex-col justify-between'
			style={{ height: '100%' }}
		>
			<div>
				{isLoading ? (
					<Loader />
				) : data ? (
					<>
						<div className='text-xl text-white mt-4 mb-6 ml-6'>Категорії:</div>
						<ul>
							{data.map(category => (
								<li key={category.id}>
									{category.subcategories?.length &&
									category.generalCategory === null ? (
										<DropdownCategory category={category} />
									) : category.generalCategory === null ? (
										<Category category={category} />
									) : (
										<></>
									)}
								</li>
							))}
						</ul>
					</>
				) : (
					<div>Категорій не знайдено!</div>
				)}
			</div>
		</aside>
	)
}

export default Sidebar
