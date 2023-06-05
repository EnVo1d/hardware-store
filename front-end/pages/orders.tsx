import { NextPageAuth } from '@/providers/auth-provider/auth-page.types'
import { OrderService } from '@/services/orders.service'
import Heading from '@/ui/Heading'
import Meta from '@/ui/Meta'
import Layout from '@/ui/layout/Layout'
import { convertPrice } from '@/utils/convert-price'
import { useQuery } from '@tanstack/react-query'

const UserOrdersPage: NextPageAuth = () => {
	const { data: orders } = useQuery(
		['my orders'],
		() => OrderService.getAll(),
		{ select: ({ data }) => data }
	)

	return (
		<Meta title='Замовлення'>
			<Layout>
				<Heading>Мої замовлення</Heading>

				<section>
					{orders?.length ? (
						orders.map(order => (
							<div
								key={order.id}
								className='bg-white shadow p-7 my-7 rounded-lg grid grid-cols-3 gap-4'
							>
								<div className='flex flex-col justify-between'>
									<span>
										№ {order.id} от{' '}
										{new Date(order.createdAt).toLocaleDateString()}
									</span>
									<span>{order.status}</span>
								</div>
								<div className='flex flex-col justify-between'>
									<span className='text-black/75 font-semibold'>
										Сума замовлення
									</span>
									<span>{convertPrice(order.total)}</span>
								</div>
								<div className='flex flex-row justify-end'>
									{order.items.map(item => (
										<img
											key={item.id}
											className='ml-3'
											src={item.product.images[0]}
											alt={item.product.name}
											width={50}
										/>
									))}
								</div>
							</div>
						))
					) : (
						<>Замовлення не знайденi!</>
					)}
				</section>
			</Layout>
		</Meta>
	)
}

UserOrdersPage.isOnlyUser = true

export default UserOrdersPage
