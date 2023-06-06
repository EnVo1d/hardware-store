import { IReview } from '@/types/review.interface'
import { convertDate } from '@/utils/convert-date'
import { FC } from 'react'
import { Rating } from 'react-simple-star-rating'

const Review: FC<{ review: IReview }> = ({ review }) => {
	return (
		<div className='bg-white rounded-md shadow-sm mt-3 p-5 flex flex-col'>
			<div className='inline-flex flex-row justify-between'>
				<section className='font-semibold'>
					{review.user.name} {review.user.surname}
				</section>
				<section className='text-black/50'>
					{convertDate(review.createdAt)}
				</section>
			</div>
			<hr className='text-black/10' />
			<Rating
				readonly
				initialValue={review.rating}
				SVGstyle={{ display: 'inline-block' }}
				size={20}
				allowFraction
				transition
				className='mt-3'
			/>
			<span className='mt-3'>{review.text}</span>
		</div>
	)
}

export default Review
