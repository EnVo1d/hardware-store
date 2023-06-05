import { useAuth } from '@/hooks/useAuth'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import Search from './Search'
import HeaderCart from './cart/HeaderCart'
import HeaderProfile from './profile/HeaderProfile'

const Header: FC = () => {
	const { user } = useAuth()

	return (
		<header
			className='bg-secondary w-full py-6 px-6 grid'
			style={{
				gridTemplateColumns: '1fr 3fr 1.2fr'
			}}
		>
			<Link href='/'>
				<Image priority width={50} height={50} src='/favicon.svg' alt='store' />
			</Link>
			<Search />
			<div className='flex items-center justify-end gap-10 -mt-1.5'>
				{!!user && (
					<Link
						href='/favorites'
						className='text-white transition-all duration-500 hover:text-primary/90'
					>
						<AiOutlineHeart size={28} />
					</Link>
				)}
				<HeaderCart />
				<HeaderProfile />
			</div>
		</header>
	)
}

export default Header
