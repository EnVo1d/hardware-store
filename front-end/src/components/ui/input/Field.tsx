import cn from 'clsx'
import { forwardRef } from 'react'
import { IField } from './field.interface'

const Field = forwardRef<HTMLInputElement, IField>(
	({ placeholder, error, className, type = 'text', Icon, ...rest }, ref) => {
		return (
			<div className={cn('mb-4', className)}>
				<label>
					<span className='mb-1 block'>
						{Icon && <Icon className='mr-3' />}
						{placeholder}
					</span>
					<input
						type={type}
						placeholder={placeholder}
						{...rest}
						ref={ref}
						className={cn(
							'px-4 py-2 w-full outline-none border border-grey border-solid focus:border-primary transition-all placeholder:text-gray rounded-lg',
							{ 'border-red': !!error }
						)}
					/>
				</label>
				{error && <div className='text-red mt-1 text-sm'>{error}</div>}
			</div>
		)
	}
)

Field.displayName = 'Field'

export default Field
