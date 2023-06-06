import { useAuth } from '@/hooks/useAuth'
import { ReviewService } from '@/services/review.service'
import { ILeaveReview, TypeReviewData } from '@/types/review.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Rating } from 'react-simple-star-rating'
import Button from '../button/Button'

interface IReviewForm {
	productId: string | number
}

const ReviewForm: FC<IReviewForm> = ({ productId }) => {
	const [open, setOpen] = useState<true | false>(false)
	const [rating, setRating] = useState(0)
	const [tempRating, setTempRating] = useState(0)

	const { user } = useAuth()

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		reset
	} = useForm<TypeReviewData>({ mode: 'onChange' })

	const queryClient = useQueryClient()

	const { mutate } = useMutation(
		['leave review'],
		(data: ILeaveReview) => ReviewService.leave(data),
		{
			onSuccess() {
				queryClient.invalidateQueries(['reviews'])
			}
		}
	)

	const onSubmit: SubmitHandler<TypeReviewData> = data => {
		data.rating = rating
		mutate({ productId, data })
		reset()
		setRating(0)
		setTempRating(0)
		setOpen(false)
	}

	const handleRating = (rate: number) => {
		setRating(rate)
		setValue('rating', rate)
	}

	const onPointerLeave = () => setTempRating(0)

	return (
		<div className='bg-white rounded-lg p-5'>
			{!open ? (
				<section className='flex flex-row justify-between'>
					<span className='font-semibold mt-2'>
						Залиште свій відгук про цей товар
					</span>
					<Button
						variant='white'
						size='sm'
						className='border border-solid'
						onClick={() => setOpen(true)}
						disabled={!user}
					>
						Написати відгук
					</Button>
				</section>
			) : (
				<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
					<h1 className='font-semibold text-lg'>Написати відгук</h1>
					<span className='text-md mt-5'>Рейтинг товару</span>
					<Rating
						initialValue={tempRating | rating}
						SVGstyle={{ display: 'inline-block' }}
						size={40}
						allowFraction
						transition
						className='mt-1'
						onClick={handleRating}
						onPointerLeave={onPointerLeave}
					/>
					<span className='text-md mt-5'>Коментар</span>
					<textarea
						className='mt-3 h-20 border border-primary/50 border-solid hover:border-primary rounded-lg p-1 transition-all duration-300 placeholder:text-red'
						{...register('text', {
							required: 'Необхідно написати коментар'
						})}
						placeholder={errors.text?.message}
					></textarea>
					<div className='mt-5 flex flex-row'>
						<Button size='sm' variant='orange' className='mr-5' type='submit'>
							Зберегти
						</Button>
						<Button
							size='sm'
							variant='orange'
							type='button'
							onClick={() => {
								reset()
								setRating(0)
								setTempRating(0)
								setOpen(false)
							}}
						>
							Скасувати
						</Button>
					</div>
				</form>
			)}
		</div>
	)
}

export default ReviewForm
