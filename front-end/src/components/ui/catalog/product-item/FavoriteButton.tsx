import { useProfile } from '@/hooks/useProfile'
import { UserService } from '@/services/user.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import cn from 'clsx'
import { FC } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

interface IFavoriteButton {
	productId: number
	className?: string
	size?: number
}

const FavoriteButton: FC<IFavoriteButton> = ({
	productId,
	className,
	size
}) => {
	const { profile } = useProfile()

	const queryClient = useQueryClient()

	const { mutate } = useMutation(
		['toggle favorite'],
		() => UserService.toggleFavorite(productId),
		{
			onSuccess() {
				queryClient.invalidateQueries(['get profile'])
			}
		}
	)

	if (!profile) return null

	const isExists = profile.favorites.some(favorite => favorite.id === productId)

	return (
		<div>
			<button
				onClick={() => mutate()}
				className={cn('text-primary', className)}
			>
				{isExists ? (
					<AiFillHeart size={size} />
				) : (
					<AiOutlineHeart size={size} />
				)}
			</button>
		</div>
	)
}

export default FavoriteButton
