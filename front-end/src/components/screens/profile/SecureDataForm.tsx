import { UserService } from '@/services/user.service'
import { IUserDataForm, TypeUserData } from '@/types/user.interface'
import Button from '@/ui/button/Button'
import Field from '@/ui/input/Field'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { validEmail } from '../auth/valid-email'
import DataField from './DataField'
import DataLabel from './DataLabel'

const SecureDataForm: FC<IUserDataForm> = ({ Icon, items, title }) => {
	const [edit, setEdit] = useState(false)
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<TypeUserData>({ mode: 'onChange' })

	const queryClient = useQueryClient()

	const { mutate } = useMutation(
		['update profile'],
		(data: TypeUserData) => UserService.updateProfile(data),
		{
			onSuccess() {
				queryClient.invalidateQueries(['get profile'])
			}
		}
	)

	const onSubmit: SubmitHandler<TypeUserData> = data => {
		mutate(data)
		reset()
		setEdit(false)
	}
	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='inline-flex flex-col ml-10'
			>
				<div className='inline-flex flex-row'>
					<Icon size={30} />
					<span className='text-xl font-semibold ml-2'>{title}</span>
				</div>
				{!edit ? (
					items.map(item => (
						<div className='inline-flex flex-col' key={item.formField}>
							<DataLabel>{item.name}</DataLabel>
							<DataField>{item.param}</DataField>
						</div>
					))
				) : (
					<>
						{items.map(item =>
							item.formField === 'email' ? (
								<section key={item.formField} className='mt-4'>
									<DataLabel>{item.name}</DataLabel>
									<Field
										{...register('email', {
											required: 'Необхідно вказати адресу електронної пошти',
											pattern: {
												value: validEmail,
												message:
													'Будь ласка, введіть дійсну адресу електронної пошти'
											}
										})}
										defaultValue={item.param}
										showSpan={false}
										placeholder={item.param}
										error={errors.surname?.message}
									/>
								</section>
							) : item.formField === 'password' ? (
								<section key={item.formField}>
									<DataLabel>{item.name}</DataLabel>
									<Field
										{...register('password', {
											required: 'Необхідно ввести пароль',
											minLength: {
												value: 6,
												message: 'Мінімальна довжина має бути більше 6 символів'
											}
										})}
										type='password'
										defaultValue={item.param}
										showSpan={false}
										placeholder={item.param}
										error={errors.name?.message}
									/>
								</section>
							) : (
								<></>
							)
						)}
						<div>
							<Button size='sm' variant='orange' className='mr-5' type='submit'>
								Зберегти
							</Button>
							<Button
								size='sm'
								variant='orange'
								type='button'
								onClick={() => setEdit(false)}
							>
								Скасувати
							</Button>
						</div>
					</>
				)}
			</form>
			{!edit && (
				<div className='ml-20'>
					<Button size='sm' variant='white' onClick={() => setEdit(true)}>
						Редагувати
					</Button>
				</div>
			)}
		</>
	)
}

export default SecureDataForm
