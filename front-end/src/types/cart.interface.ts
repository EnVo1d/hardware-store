import { IProduct } from './product.interface'

export interface ICartItem {
	id: number
	product: IProduct
	quantity: number
	price: number
}

export interface ICartInitialState {
	items: ICartItem[]
}

export interface IChangeQuantityPayload extends Pick<ICartItem, 'id'> {
	type: 'minus' | 'plus'
}

export interface IAddToCartPayload extends Omit<ICartItem, 'id'> {}
