export interface IUser {
	id: number
	email: string
	name: string
	phone: string
}

export type TypeUserData = {
	email: string
	password?: string
	name?: string
	phone?: string
}
