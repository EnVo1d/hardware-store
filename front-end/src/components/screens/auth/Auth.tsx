import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'
import { IEmailPassword } from '@/store/user/user.interface'
import Heading from '@/ui/Heading'
import Loader from '@/ui/Loader'
import Meta from '@/ui/Meta'
import Button from '@/ui/button/Button'
import Field from '@/ui/input/Field'
import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAuthRedirect } from './useAuthRedirect'
import { validEmail } from './valid-email'

const Auth: FC = () => {
	useAuthRedirect()

	const { isLoading } = useAuth()

	const { login, register } = useActions()

	const [type, setType] = useState<'login' | 'register'>('login')

	const {
		register: formRegister,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<IEmailPassword>({ mode: 'onChange' })

	const onSubmit: SubmitHandler<IEmailPassword> = data => {
		if (type === 'login') login(data)
		else register(data)
		reset()
	}

	return (
		<Meta title='Аутентифікація'>
			<section className='flex h-screen'>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='rounded-lg bg-white shadow-sm p-8 m-auto'
				>
					<Heading className='text-center mb-4'>
						{type === 'login' ? 'Увійти' : 'Зареєструватися'}
					</Heading>
					{isLoading && <Loader />}
					<Field
						{...formRegister('email', {
							required: 'Необхідно вказати адресу електронної пошти',
							pattern: {
								value: validEmail,
								message: 'Будь ласка, введіть дійсну адресу електронної пошти'
							}
						})}
						placeholder='Пошта'
						error={errors.email?.message}
					/>
					<Field
						{...formRegister('password', {
							required: 'Необхідно ввести пароль',
							minLength: {
								value: 6,
								message: 'Мінімальна довжина має бути більше 6 символів'
							}
						})}
						type='password'
						placeholder='Пароль'
						error={errors.password?.message}
					/>
					<section className='flex flex-col'>
						<Button variant='orange' className='mx-auto' type='submit'>
							{type === 'login' ? 'Увійти' : 'Зареєструватися'}
						</Button>
						<button
							className='inline-block opacity-40 mt-3 text-sm'
							type='button'
							onClick={() => setType(type === 'login' ? 'register' : 'login')}
						>
							{type === 'login' ? 'Зареєструватися' : 'Увійти'}
						</button>
					</section>
				</form>
			</section>
		</Meta>
	)
}

export default Auth
