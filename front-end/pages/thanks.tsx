import Heading from '@/ui/Heading'
import Meta from '@/ui/Meta'
import Layout from '@/ui/layout/Layout'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const ThanksPage: NextPage = () => {
	const { replace } = useRouter()

	useEffect(() => {
		setTimeout(() => {
			replace('/')
		}, 500)
	}, [])

	return (
		<Meta title='Замовлення'>
			<Layout>
				<Heading>Дякуємо за замовлення!</Heading>
			</Layout>
		</Meta>
	)
}

export default ThanksPage
