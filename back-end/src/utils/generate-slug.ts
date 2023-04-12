const translit = (str: string): string => {
	const ua =
		'А-а-Б-б-В-в-Г-г-Ґ-ґ-Д-д-Е-е-Є-є-Ж-ж-З-з-И-и-І-і-Ї-ї-Й-й-К-к-Л-л-М-м-Н-н-О-о-П-п-Р-р-С-с-Т-т-У-у-Ф-ф-Х-х-Ц-ц-Ч-ч-Ш-ш-Щ-щ-Ь-ь-Ю-ю-Я-я'.split(
			'-'
		)
	const en =
		"A-a-B-b-V-v-G-g-G-g-D-d-E-e-E-e-ZH-zh-Z-z-Y-y-I-i-I-i-J-j-K-k-L-l-M-m-N-n-O-o-P-p-R-r-S-s-T-t-U-u-F-f-H-h-TS-ts-CH-ch-SH-sh-SCH-sch-'-'-YU-yu-YA-ya".split(
			'-'
		)

	let res = ''
	for (let i = 0, l = str.length; i < l; i++) {
		const s = str.charAt(i),
			n = ua.indexOf(s)
		if (n >= 0) res += en[n]
		else res += s
	}
	return res
}

export const generateSlug = (str: string): string => {
	let url: string = str.replace(/[\s]+/gi, '-')
	url = translit(url)

	url = url
		.replace(/[^0-9a-z_\-]+/gi, '')
		.replace('---', '-')
		.replace('--', '-')
		.toLowerCase()

	return url
}
