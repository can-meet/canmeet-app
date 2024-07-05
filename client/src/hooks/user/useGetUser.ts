import { getUserApi } from '@/api/user/getUser'
import { useAuthStore } from '@/store/authStore'
import type { UserType } from '@/types/user'
import { useQuery } from '@tanstack/react-query'

const fetchUserData = async (userId: string) => {
  const res = await getUserApi({ userId })
  return res.data
}

export const useGetUser = () => {
  const { currentUser } = useAuthStore()

  const { data: user, isLoading } = useQuery<UserType>({
    queryKey: ['user', currentUser?._id],
    queryFn: () => fetchUserData(currentUser?._id as string),
    enabled: !!currentUser,
    initialData: {
      _id: '',
      username: '',
      email: '',
      password: '',
      profilePicture: '',
      isAdmin: false,
      postedProducts: [],
      purchasedProducts: [],
    },
  })

  return { user, isLoading }
}