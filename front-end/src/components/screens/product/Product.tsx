import { ProductService } from '@/services/product.service'
import { IProduct } from '@/types/product.interface'
import Loader from '@/ui/Loader'
import Button from '@/ui/button/Button'
import AddToCartButton from '@/ui/catalog/product-item/AddToCartButton'
import FavoriteButton from '@/ui/catalog/product-item/FavoriteButton'
import ProductItem from '@/ui/catalog/product-item/ProductItem'
import ProductRating from '@/ui/catalog/product-item/ProductRating'
import Review from '@/ui/product/Review'
import ReviewForm from '@/ui/product/ReviewForm'
import { convertPrice } from '@/utils/convert-price'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { FC, useState } from 'react'
import { AiOutlineHome, AiOutlineRight } from 'react-icons/ai'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

const Product: FC<{ product: IProduct }> = ({ product }) => {
	const [state, setState] = useState<'info' | 'reviews'>('info')

	const { data: reviewsRes, isLoading } = useQuery(
		['reviews', product.slug],
		() => ProductService.getBySlugReviews(product.slug),
		{ keepPreviousData: true, initialData: { reviews: product.reviews } }
	)

	return (
		<div className='flex flex-col px-40'>
			<section className='inline-flex flex-row'>
				<Link
					className='text-sm text-aqua hover:text-primary transition-all duration-300'
					href={`/`}
				>
					<AiOutlineHome size={20} />
				</Link>
				{product.category.generalCategory?.generalCategory && (
					<>
						<AiOutlineRight size={20} className='mx-5' />
						<Link
							className='text-md text-aqua hover:text-primary transition-all duration-300 -mt-1'
							href={`/category/${product.category.generalCategory.generalCategory.slug}`}
						>
							{product.category.generalCategory.generalCategory.name}
						</Link>
					</>
				)}
				{product.category.generalCategory && (
					<>
						<AiOutlineRight size={20} className='mx-5' />
						<Link
							className='text-md text-aqua hover:text-primary transition-all duration-300 -mt-1'
							href={`/category/${product.category.generalCategory.slug}`}
						>
							{product.category.generalCategory.name}
						</Link>
					</>
				)}
				<AiOutlineRight size={20} className='mx-5' />
				<Link
					className='text-md text-aqua hover:text-primary transition-all duration-300 -mt-1'
					href={`/category/${product.category.slug}`}
				>
					{product.category.name}
				</Link>
			</section>
			<div className='mt-5'>
				<h1 className='font-semibold text-4xl'>
					{state === 'reviews' && 'Відгуки покупців про '}
					{product.name}
				</h1>
				<ProductRating product={product} />
			</div>
			<section className='bg-white rounded-lg mt-1 p-1 shadow-sm'>
				<Button
					className='mx-5'
					variant={state === 'info' ? 'orange' : 'white'}
					size='sm'
					onClick={() => setState('info')}
				>
					Про товар
				</Button>
				<Button
					className='mx-5'
					variant={state === 'reviews' ? 'orange' : 'white'}
					size='sm'
					onClick={() => setState('reviews')}
				>
					Відгуки{product.reviews.length && ` ${product.reviews.length}`}
				</Button>
			</section>
			{state === 'info' ? (
				<div className='mt-5 inline-flex flex-row'>
					<div className='w-2/4 bg-white rounded-lg overflow-hidden shadow-lg'>
						<Carousel
							dynamicHeight={true}
							showArrows={true}
							width={'100%'}
							showStatus={false}
							showIndicators={false}
							thumbWidth={60}
						>
							{product.images.map(image => (
								<div key={image}>
									<img src={image} alt={product.name} />
								</div>
							))}
						</Carousel>
					</div>
					<div className='ml-24 inline-flex flex-col'>
						<div className='inline-flex flex-row h-fit py-5 px-12 bg-white rounded-lg  shadow-lg justify-center'>
							<h1 className='font-semibold text-3xl '>
								{convertPrice(product.price)}
							</h1>
							<AddToCartButton
								product={product}
								type='product_page'
								className='ml-10'
							/>
							<FavoriteButton
								productId={product.id}
								className='ml-10 mt-1'
								size={30}
							/>
						</div>
						<div className='mt-10 h-fit py-5 px-12 bg-white rounded-lg inline-flex flex-col shadow-lg justify-center'>
							<div>
								<span className='font-semibold text-2xl'>Опис</span>
								<span className='text-2xl text-black/40 ml-2'>
									{product.name}
								</span>
							</div>
							<span className='mt-2 text-md'>{product.description}</span>
						</div>
					</div>
				</div>
			) : (
				<div className='grid mt-3' style={{ gridTemplateColumns: '5fr 1fr' }}>
					<div className='px-3'>
						<ReviewForm productId={product.id} />
						{isLoading ? (
							<Loader />
						) : (
							reviewsRes?.reviews.map(review => (
								<Review review={review} key={review.id} />
							))
						)}
					</div>

					<aside className='bg-white flex justify-center rounded-lg p-3 shadow-md'>
						<ProductItem product={product} />
					</aside>
				</div>
			)}
		</div>
	)
}

export default Product
