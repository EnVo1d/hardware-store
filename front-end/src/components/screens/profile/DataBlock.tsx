import { IDataBlock } from '@/types/user.interface'
import { FC } from 'react'
import PersonalDataForm from './PersonalDataForm'
import SecureDataForm from './SecureDataForm'

const DataBlock: FC<IDataBlock> = ({ Icon, items, title, type }) => {
	return (
		<div className='bg-white flex flex-row rounded-lg p-5 mt-10'>
			{type === 'personal' ? (
				<PersonalDataForm Icon={Icon} items={items} title={title} />
			) : (
				<SecureDataForm Icon={Icon} items={items} title={title} />
			)}
		</div>
	)
}

export default DataBlock
