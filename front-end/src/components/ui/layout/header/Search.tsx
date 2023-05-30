import Link from 'next/link'
import { FC, useState } from 'react'
import { BsSearch } from 'react-icons/bs'

const Search: FC = () => {
	const [input, setInput] = useState('')

	return (
		<div>
			<div className='relative flex w-full flex-wrap items-stretch'>
				<input
					type='search'
					value={input}
					onInput={e => setInput(e.currentTarget.value)}
					placeholder='Search...'
					aria-label='Search'
					aria-describedby='button-addon'
					className='relative block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-gray/20 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base leading-[1.6] text-white/75 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary'
				/>
				<Link
					className='relative z-[2] flex items-center rounded-r bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary/70 hover:shadow-lg'
					id='button-addon'
					href={`/q?term=${input}`}
				>
					<BsSearch size={20} />
				</Link>
			</div>
		</div>
	)
}

export default Search
