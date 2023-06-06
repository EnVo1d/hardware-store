import { IProduct } from '@/types/product.interface'
import { FC, useState } from 'react'
import { Rating } from 'react-simple-star-rating'

interface IRating {
	product: IProduct
	showText?: boolean
}

const ProductRating: FC<IRating> = ({ product, showText = true }) => {
	const [rating, setRating] = useState(
		product.reviews.reduce((acc, review) => acc + review.rating, 0) /
			product.reviews.length || 0
	)

	return (
		<div className='mb-2'>
			{!!product.reviews.length && (
				<span className='mr-1 inline-flex items-center'>
					<Rating
						readonly
						initialValue={rating}
						SVGstyle={{ display: 'inline-block' }}
						size={20}
						allowFraction
						transition
					/>
				</span>
			)}

			{showText && (
				<span className='text-xs'>({product.reviews.length} відгуків)</span>
			)}
		</div>
	)
}

export default ProductRating
