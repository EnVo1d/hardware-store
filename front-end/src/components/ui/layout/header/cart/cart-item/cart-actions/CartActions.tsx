import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'
import { ICartItem } from '@/types/cart.interface'
import { FC } from 'react'
import { FiMinus, FiPlus, FiTrash } from 'react-icons/fi'

const CartActions: FC<{ item: ICartItem }> = ({ item }) => {
	const { removeFromCart, changeQuantity } = useActions()

	const { items } = useCart()
	const quantity = items.find(cartItem => cartItem.id === item.id)?.quantity

	return (
		<div className='mt-3'>
			<div className='flex items-center gap-3  '>
				<button
					className='transition-all duration-500 hover:text-primary/90'
					onClick={() => changeQuantity({ id: item.id, type: 'minus' })}
					disabled={quantity === 1}
				>
					<FiMinus fontSize={13} />
				</button>

				<input
					disabled
					readOnly
					value={quantity}
					className='w-10 bg-black text-center'
				/>

				<button
					onClick={() => changeQuantity({ id: item.id, type: 'plus' })}
					className='transition-all duration-500 hover:text-primary/90'
				>
					<FiPlus fontSize={13} />
				</button>

				<button
					onClick={() => removeFromCart({ id: item.id })}
					className='ml-3 text-dark-primary transition-all duration-500 hover:text-primary/90'
				>
					<FiTrash />
				</button>
			</div>
		</div>
	)
}

export default CartActions
