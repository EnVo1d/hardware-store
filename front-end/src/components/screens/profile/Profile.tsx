import { useProfile } from '@/hooks/useProfile'
import { TypeItem } from '@/types/user.interface'
import Heading from '@/ui/Heading'
import Meta from '@/ui/Meta'
import Layout from '@/ui/layout/Layout'
import { FC } from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import { FiLock } from 'react-icons/fi'
import DataBlock from './DataBlock'

const Profile: FC = () => {
	const { profile } = useProfile()

	const personalData: TypeItem[] = [
		{
			name: 'Прізвище',
			formField: 'surname',
			param: profile?.surname || ''
		},
		{
			name: "Ім'я",
			formField: 'name',
			param: profile?.name || ''
		},
		{
			name: 'Телефон',
			formField: 'phone',
			param: profile?.phone || ''
		},
		{
			name: 'Пошта',
			formField: 'email',
			param: profile?.email || ''
		}
	]

	const secureData: TypeItem[] = [
		{
			name: 'Пошта',
			formField: 'email',
			param: profile?.email || ''
		},
		{
			name: 'Пароль',
			formField: 'password',
			param: '*********'
		}
	]

	return (
		<Meta title='Профіль'>
			<Layout>
				<div>
					<Heading>Особисті дані</Heading>

					<DataBlock
						Icon={FaRegUserCircle}
						items={personalData}
						title='Особисті дані'
						type='personal'
					/>

					<DataBlock
						Icon={FiLock}
						items={secureData}
						title='Логін'
						type='secure'
					/>
				</div>
			</Layout>
		</Meta>
	)
}

export default Profile
