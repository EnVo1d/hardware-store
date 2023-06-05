import { useProfile } from '@/hooks/useProfile'
import { NextPageAuth } from '@/providers/auth-provider/auth-page.types'
import Meta from '@/ui/Meta'
import Catalog from '@/ui/catalog/Catalog'
import Layout from '@/ui/layout/Layout'

const FavoritesPage: NextPageAuth = () => {
	const { profile } = useProfile()

	return (
		<Meta title='Список бажань'>
			<Layout>
				<Catalog products={profile?.favorites || []} title='Список бажань' />
			</Layout>
		</Meta>
	)
}

FavoritesPage.isOnlyUser = true

export default FavoritesPage
