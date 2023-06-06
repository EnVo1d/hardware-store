import { useActions } from '@/hooks/useActions'
import { useProfile } from '@/hooks/useProfile'
import cn from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import { FaRegUserCircle } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import { MdOutlineListAlt } from 'react-icons/md'

const ProfileSidebar: FC = () => {
	const { asPath } = useRouter()
	const { profile } = useProfile()
	const { logout } = useActions()

	return (
		<aside
			className='bg-secondary flex flex-col justify-between'
			style={{ height: '100%' }}
		>
			<div>
				<ul>
					<li>
						<Link
							className={cn(
								'text-lg my-3 px-10 hover:text-primary transition-colors duration-200 flex flex-row',
								asPath === `/profile` ? 'text-primary' : 'text-white'
							)}
							href={`/profile`}
						>
							<FaRegUserCircle className='mt-2' size={30} />
							<div className='ml-5 inline-flex flex-col'>
								<span className='text-sm'>
									{profile?.name} {profile?.surname}
								</span>
								<span className='text-sm text-white/60'>{profile?.email}</span>
							</div>
						</Link>
						<hr />
						<Link
							className={cn(
								'flex flex-row text-lg my-3 px-10 hover:text-primary transition-colors duration-200',
								asPath === `/favorites` ? 'text-primary' : 'text-white'
							)}
							href={`/favorites`}
						>
							<AiOutlineHeart size={30} />
							<span className='ml-5 '>Список бажань</span>
						</Link>
						<Link
							className={cn(
								'flex flex-row text-lg my-3 px-10 hover:text-primary transition-colors duration-200',
								asPath === `/orders` ? 'text-primary' : 'text-white'
							)}
							href={`/orders`}
						>
							<MdOutlineListAlt size={30} />
							<span className='ml-5 '>Мої замовлення</span>
						</Link>
					</li>
					))
				</ul>
			</div>

			<button
				className='text-white flex items-center ml-10 mb-10'
				onClick={() => logout()}
			>
				<FiLogOut />
				<span className='ml-2'>Вихід</span>
			</button>
		</aside>
	)
}

export default ProfileSidebar
