import { useAuth } from '@/hooks/useAuth'
import { FC } from 'react'
import { AiOutlineUser } from 'react-icons/ai'

const HeaderProfile: FC = () => {
	const { user } = useAuth()

	return (
		<>
			{user && (
				<div className='text-white transition-all duration-500 hover:text-primary/90'>
					<AiOutlineUser size={40} />
				</div>
			)}
		</>
	)
}

export default HeaderProfile
