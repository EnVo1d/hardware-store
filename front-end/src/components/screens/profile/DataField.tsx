import { FC, PropsWithChildren } from 'react'

const DataField: FC<PropsWithChildren> = ({ children }) => {
	return <span className='text-base font-normal mt-1'>{children}</span>
}

export default DataField
