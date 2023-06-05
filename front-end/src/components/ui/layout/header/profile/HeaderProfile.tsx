import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'
import { useOutside } from '@/hooks/useOutside'
import Button from '@/ui/button/Button'
import cn from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { AiOutlineProfile, AiOutlineUser } from 'react-icons/ai'
import { FiLogOut } from 'react-icons/fi'

const HeaderProfile: FC = () => {
	const { isShow, setIsShow, ref } = useOutside(false)
	const { user } = useAuth()
	const { logout } = useActions()
	const { push } = useRouter()

	return (
		<div className='relative' ref={ref}>
			<div
				className='text-white transition-all duration-500 hover:text-primary/90 cursor-pointer'
				onClick={() => {
					setIsShow(!isShow)
				}}
			>
				<AiOutlineUser size={40} />
			</div>

			<div
				className={cn(
					'absolute top-[4.2rem] w-60 -left-[11rem] bg-secondary rounded-xl px-5 py-3 text-sm menu z-20 text-white border border-solid border-primary',
					isShow ? 'open-menu' : 'close-menu'
				)}
			>
				<div className='text-center'>
					{user ? (
						<>
							<Button
								variant='transparent'
								size='sm'
								onClick={() => {
									push('/profile')
									setIsShow(!isShow)
								}}
								className='inline-flex'
							>
								<AiOutlineProfile className='mt-1' />
								<span className='ml-2 '>Кабінет</span>
							</Button>
							<Button
								variant='orange'
								size='sm'
								onClick={() => {
									logout()
									setIsShow(!isShow)
								}}
								className='inline-flex mt-4'
							>
								<FiLogOut className='mt-1' />
								<span className='ml-2 '>Вихід</span>
							</Button>
						</>
					) : (
						<Button variant='white' size='sm'>
							<Link href='/auth'>Увійти</Link>
						</Button>
					)}
				</div>
			</div>
		</div>
	)
}

export default HeaderProfile
