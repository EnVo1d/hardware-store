import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'
import { IProduct } from '@/types/product.interface'
import Button from '@/ui/button/Button'
import { FC } from 'react'
import { RiShoppingCartFill, RiShoppingCartLine } from 'react-icons/ri'

interface ICartButton {
	product: IProduct
	type?: 'catalog' | 'product_page'
	className?: string
}

const AddToCartButton: FC<ICartButton> = ({
	product,
	type = 'catalog',
	className
}) => {
	const { addToCart, removeFromCart } = useActions()
	const { items } = useCart()

	const currentElement = items.find(
		cartItem => cartItem.product.id === product.id
	)

	if (type === 'catalog')
		return (
			<div>
				<button
					className='text-secondary'
					onClick={() =>
						currentElement
							? removeFromCart({ id: currentElement.id })
							: addToCart({
									product,
									quantity: 1,
									price: product.price
							  })
					}
				>
					{currentElement ? <RiShoppingCartFill /> : <RiShoppingCartLine />}
				</button>
			</div>
		)
	else
		return (
			<Button
				variant='orange'
				size='sm'
				className={className}
				onClick={() =>
					currentElement
						? removeFromCart({ id: currentElement.id })
						: addToCart({
								product,
								quantity: 1,
								price: product.price
						  })
				}
			>
				<div className='flex flex-row'>
					{currentElement ? (
						<RiShoppingCartFill size={20} />
					) : (
						<RiShoppingCartLine size={20} />
					)}
					<span className='ml-3'>{currentElement ? 'У кошику' : 'Купити'}</span>
				</div>
			</Button>
		)
}

export default AddToCartButton
