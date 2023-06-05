import Home from '@/screens/home/Home'
import { ProductService } from '@/services/product.service'
import { TypePaginationProducts } from '@/types/product.interface'
import { GetStaticProps, NextPage } from 'next'

const HomePage: NextPage<TypePaginationProducts> = ({ data, meta }) => {
	return <Home data={data} meta={meta} />
}

export const getStaticProps: GetStaticProps<
	TypePaginationProducts
> = async () => {
	const data = await ProductService.getAll({
		page: 1,
		perPage: 10
	})

	return {
		props: data
	}
}

export default HomePage
