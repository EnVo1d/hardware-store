import { IUser, TypeUserData } from '@/types/user.interface'

import { instance } from '@/api/api.interceptor'

const USERS = 'users'

export const UserService = {
	async getProfile() {
		return instance<IUser>({
			url: `${USERS}/profile`,
			method: 'GET'
		})
	},

	async updateProfile(data: TypeUserData) {
		return instance<IUser>({
			url: `${USERS}/profile`,
			method: 'PUT',
			data
		})
	},

	async toggleFavorite(productId: string | number) {
		return instance<IUser>({
			url: `${USERS}/profile/favorites/${productId}`,
			method: 'PATCH'
		})
	}
}
