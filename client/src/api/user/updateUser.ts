import axios, { AxiosResponse } from 'axios';
import { UserType } from '@/types/user';

type UpdateUserData = {
  userId: string;
  username: string;
};

export const updateUserApi = async ({
  userId,
  username,
}: UpdateUserData): Promise<AxiosResponse<UserType>> => {
  const res = await axios.put(`${import.meta.env.VITE_API_URL}/users/${userId}`, { username });
  return res;
};