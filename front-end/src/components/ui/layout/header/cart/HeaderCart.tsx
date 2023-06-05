import { useCart } from '@/hooks/useCart'
import { useOutside } from '@/hooks/useOutside'
import Button from '@/ui/button/Button'
import SquareButton from '@/ui/button/SquareButton'
import { convertPrice } from '@/utils/convert-price'
import cn from 'clsx'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { RiShoppingCartLine } from 'react-icons/ri'
import CartItem from './cart-item/CartItem'

import { useActions } from '@/hooks/useActions'
import { OrderService } from '@/services/orders.service'
import { useMutation } from '@tanstack/react-query'
import styles from './Cart.module.sass'

const HeaderCart: FC = () => {
	const { isShow, setIsShow, ref } = useOutside(false)

	const { items, total } = useCart()

	const { reset } = useActions()

	const { push } = useRouter()

	const { mutate } = useMutation(
		['create order'],
		() =>
			OrderService.place({
				items: items.map(item => ({
					price: item.price,
					quantity: item.quantity,
					productId: item.product.id
				}))
			}),
		{
			onSuccess({ data }) {
				if (data.message === 'Success') push('/thanks').then(() => reset())
			}
		}
	)

	return (
		<div className='relative' ref={ref}>
			<SquareButton
				Icon={RiShoppingCartLine}
				onClick={() => {
					setIsShow(!isShow)
				}}
				number={items.length}
			/>

			<div
				className={cn(
					'absolute top-[4.2rem] w-80 -left-[12.5rem] bg-secondary rounded-xl px-5 py-3 text-sm menu z-20 text-white',
					isShow ? 'open-menu' : 'close-menu'
				)}
			>
				<div className='font-normal text-lg mb-5'>Кошик</div>

				<div className={styles.cart}>
					{items.length ? (
						items.map(item => <CartItem item={item} key={item.id} />)
					) : (
						<div className='font-light'>Кошик порожній</div>
					)}
				</div>

				<div className={styles.footer}>
					<div>Сума:</div>
					<div>{convertPrice(total)}</div>
				</div>

				<div className='text-center'>
					<Button
						variant='white'
						size='sm'
						className='btn-link mt-5 mb-2'
						onClick={() => mutate()}
						disabled={total === 0}
					>
						Оформити
					</Button>
				</div>
			</div>
		</div>
	)
}

export default HeaderCart
