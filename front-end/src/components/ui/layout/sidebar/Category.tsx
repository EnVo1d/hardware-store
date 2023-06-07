import { ICategory } from '@/types/category.interface'
import cn from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'

const Category: FC<{ category: ICategory }> = ({ category }) => {
	const { asPath } = useRouter()

	return (
		<div>
			<Link
				className={cn(
					'block text-lg my-3 px-10 hover:text-primary transition-colors duration-200',
					asPath === `/category/${category.slug}`
						? 'text-primary'
						: 'text-white'
				)}
				href={`/category/${category.slug}`}
			>
				{category.name}
			</Link>
		</div>
	)
}

export default Category
