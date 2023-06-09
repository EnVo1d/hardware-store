import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react'

import cn from 'clsx'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant: 'orange' | 'white' | 'transparent'
	size?: 'sm' | 'md' | 'lg'
}

const Button: FC<PropsWithChildren<IButton>> = ({
	children,
	className,
	variant,
	size = 'md',
	...rest
}) => {
	return (
		<button
			{...rest}
			className={cn(
				'rounded-2xl font-medium shadow px-10 py-2 hover:shadow-lg transition duration-300 ease-in-out',
				{
					'text-white bg-primary hover:bg-primary/80': variant === 'orange',
					'text-primary bg-white hover:bg-white/80': variant === 'white',
					'text-primary bg-transparent hover:text-white/90':
						variant === 'transparent',
					'px-5 py-1 text-sm': size === 'sm',
					'px-10 py-2 text-md': size === 'md',
					'px-15 py-3 text-lg': size === 'lg'
				},
				className
			)}
		>
			{children}
		</button>
	)
}

export default Button
