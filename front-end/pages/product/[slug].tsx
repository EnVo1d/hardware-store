import Product from '@/screens/product/Product'
import { ProductService } from '@/services/product.service'
import { IProduct } from '@/types/product.interface'
import Meta from '@/ui/Meta'
import Layout from '@/ui/layout/Layout'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

const ProductPage: NextPage<{ product: IProduct }> = ({ product }) => {
	return (
		<Meta title={product.name}>
			<Layout showSidebar={false}>
				<Product product={product} />
			</Layout>
		</Meta>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	const products = await ProductService.getAll()

	const paths = products.data.map(product => {
		return {
			params: { slug: product.slug }
		}
	})

	return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { data: product } = await ProductService.getBySlug(
		params?.slug as string
	)

	return {
		props: {
			product
		}
	}
}

export default ProductPage
