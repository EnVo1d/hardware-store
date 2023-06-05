import { EnumProductSort } from '@/types/product.interface'
import cn from 'clsx'
import { Dispatch, FC, SetStateAction } from 'react'
import Select from 'react-select'

const options = [
	{ value: EnumProductSort.HIGH_PRICE, label: 'Найвища ціна' },
	{ value: EnumProductSort.LOW_PRICE, label: 'Найнижча ціна' },
	{ value: EnumProductSort.NEWEST, label: 'Новіші' },
	{ value: EnumProductSort.OLDEST, label: 'Старіші' }
]

interface ISortDropdown {
	className: string
	sortType: EnumProductSort
	setSortType: Dispatch<SetStateAction<EnumProductSort>>
}

const SortDropdown: FC<ISortDropdown> = ({
	className,
	sortType,
	setSortType
}) => {
	const handleChange = (option: EnumProductSort | undefined) => {
		if (option !== undefined) setSortType(option)
	}
	return (
		<Select
			options={options}
			className={cn('', className)}
			onChange={option => handleChange(option?.value)}
		/>
	)
}

export default SortDropdown
