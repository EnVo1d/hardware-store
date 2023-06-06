export const convertDate = (date: string) => {
	return new Date(date).toLocaleDateString('ua-UA', {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	})
}
