export const convertPrice = (price: number) => {
	return new Intl.NumberFormat('ua-UA', {
		style: 'currency',
		currency: 'UAH'
	}).format(price)
}
