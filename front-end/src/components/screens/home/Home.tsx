import { TypePaginationProducts } from '@/types/product.interface'
import Meta from '@/ui/Meta'
import CatalogPagination from '@/ui/catalog/CatalogPagination'
import Layout from '@/ui/layout/Layout'
import { FC } from 'react'

const Home: FC<TypePaginationProducts> = data => {
	return (
		<Meta title='Home'>
			<Layout>
				<CatalogPagination data={data} title='Freshed products' />
			</Layout>
		</Meta>
	)
}

export default Home
