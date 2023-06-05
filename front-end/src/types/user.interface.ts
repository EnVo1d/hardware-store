import { IconType } from 'react-icons'
import { IOrder } from './order.interface'
import { IProduct } from './product.interface'

export interface IUser {
	id: number
	email: string
	name: string
	surname: string
	phone: string
}

export type TypeUserData = {
	email: string
	password?: string
	name?: string
	surname?: string
	phone?: string
}

export interface IFullUser extends IUser {
	favorites: IProduct[]
	orders: IOrder[]
}

export type TypeItem = {
	name: string
	formField: string
	param: string
}

export interface IUserDataForm {
	Icon: IconType
	title: string
	items: TypeItem[]
}

export interface IDataBlock extends IUserDataForm {
	type: 'personal' | 'secure'
}
