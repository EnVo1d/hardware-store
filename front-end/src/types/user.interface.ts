import { IOrder } from './order.interface'
import { IProduct } from './product.interface'

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

export interface IFullUser extends IUser {
	favorites: IProduct[]
	orders: IOrder[]
}
