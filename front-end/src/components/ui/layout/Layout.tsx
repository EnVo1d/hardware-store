import { useRouter } from 'next/router'
import { FC, PropsWithChildren } from 'react'
import Header from './header/Header'
import ProfileSidebar from './sidebar/ProfileSidebar'
import Sidebar from './sidebar/Sidebar'

const profileUrls = ['/profile', '/favorites', '/orders']

const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const { asPath } = useRouter()

	return (
		<div>
			<Header />
			<div className='grid h-screen' style={{ gridTemplateColumns: '1fr 4fr' }}>
				{profileUrls.includes(asPath) ? <ProfileSidebar /> : <Sidebar />}
				<main className='p-12'>{children}</main>
			</div>
		</div>
	)
}

export default Layout
