import { ICategory } from '@/types/category.interface'
import cn from 'clsx'
import { FC, useState } from 'react'
import { BsChevronRight } from 'react-icons/bs'
import Category from './Category'

const DropdownCategory: FC<{ category: ICategory }> = ({ category }) => {
	const [isOpen, setOpen] = useState(false)
	const [items, setItem] = useState(category.subcategories)

	const toggleDropdown = () => setOpen(!isOpen)

	return (
		<div className='-my-2'>
			<div className='flex flex-row'>
				<Category category={category} />
				<BsChevronRight
					className={cn(
						'text-white mt-5 cursor-pointer transition-all duration-200 hover:text-primary transform',
						isOpen ? 'rotate-90' : 'rotate-0'
					)}
					onClick={toggleDropdown}
				/>
			</div>
			{!!isOpen && (
				<div className='ml-5 -mt-3'>
					{items.map(item =>
						item.subcategories?.length ? (
							<DropdownCategory category={item} key={item.id} />
						) : (
							<Category category={item} key={item.id} />
						)
					)}
				</div>
			)}
		</div>
	)
}

export default DropdownCategory
