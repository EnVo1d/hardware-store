import { FC, PropsWithChildren } from 'react'

const DataLabel: FC<PropsWithChildren> = ({ children }) => {
	return (
		<span className='text-sm text-black/75 font-normal mt-5'>{children}</span>
	)
}

export default DataLabel
