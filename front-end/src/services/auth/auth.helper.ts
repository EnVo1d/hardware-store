import Cookies from 'js-cookie'

import { IAuthResponse, ITokens } from '@/store/user/user.interface'

export const getAccessToken = () => {
	const accessToken = Cookies.get('access-token')
	return accessToken || null
}

export const getUserFromStorage = () => {
	return JSON.parse(localStorage.getItem('user') || '{}')
}

export const saveTokensStorage = (data: ITokens) => {
	Cookies.set('access-token', data.accessToken)
	Cookies.set('refresh-token', data.refreshToken)
}

export const clearStorage = () => {
	Cookies.remove('access-token')
	Cookies.remove('refresh-token')
	localStorage.removeItem('user')
}

export const saveToStorage = (data: IAuthResponse) => {
	saveTokensStorage(data)
	localStorage.setItem('user', JSON.stringify(data.user))
}
