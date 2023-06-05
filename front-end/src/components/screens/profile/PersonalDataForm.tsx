import { UserService } from '@/services/user.service'
import { IUserDataForm, TypeUserData } from '@/types/user.interface'
import Button from '@/ui/button/Button'
import Field from '@/ui/input/Field'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import DataField from './DataField'
import DataLabel from './DataLabel'
import { validPhone } from './valid-phone'

const PersonalDataForm: FC<IUserDataForm> = ({ Icon, items, title }) => {
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
		data.email = items.find(item => item.formField === 'email')?.param as string
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
					items.map(
						item =>
							item.formField !== 'email' && (
								<div className='inline-flex flex-col'>
									<DataLabel>{item.name}</DataLabel>
									<DataField>{item.param}</DataField>
								</div>
							)
					)
				) : (
					<>
						{items.map(item =>
							item.formField === 'surname' ? (
								<section key={item.formField} className='mt-4'>
									<DataLabel>{item.name}</DataLabel>
									<Field
										{...register('surname', {
											required: 'Необхідно вказати прізвище'
										})}
										defaultValue={item.param}
										showSpan={false}
										placeholder={item.param}
										error={errors.surname?.message}
									/>
								</section>
							) : item.formField === 'name' ? (
								<>
									<DataLabel>{item.name}</DataLabel>
									<Field
										{...register('name', {
											required: "Необхідно вказати ім'я"
										})}
										defaultValue={item.param}
										showSpan={false}
										placeholder={item.param}
										error={errors.name?.message}
									/>
								</>
							) : item.formField === 'phone' ? (
								<>
									<DataLabel>{item.name}</DataLabel>
									<Field
										{...register('phone', {
											required: 'Необхідно вказати номер телефону',
											pattern: {
												value: validPhone,
												message: 'Будь ласка, введіть валідний номер телефону'
											}
										})}
										defaultValue={item.param}
										showSpan={false}
										placeholder='+38 (000) 000-00-00'
										error={errors.phone?.message}
									/>
								</>
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

export default PersonalDataForm
