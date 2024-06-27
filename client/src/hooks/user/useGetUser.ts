import { useQuery } from 'react-query';
import { useAuthStore } from "@/store/authStore";
import { UserType } from '@/types/user';
import { getUserApi } from '@/api/user/getUser';

const fetchUserData = async (userId: string) => {
  const res = await getUserApi({ userId });
  return res.data;
};

export const useGetUser = () => {
  const { currentUser } = useAuthStore();

  const { data: user, isLoading } = useQuery<UserType>(
    ['user', currentUser?._id],
    () => fetchUserData(currentUser?._id as string),
    {
      enabled: !!currentUser,
      initialData: {
        _id: "",
        username: "",
        email: "",
        password: "",
        profilePicture: "",
        isAdmin: false,
        postedProducts: [],
        purchasedProducts: [],
      },
    }
  );

  return { user, loading: isLoading };
};
