import axios, { AxiosResponse } from 'axios';
import { UserType } from '@/types/user';

type getUserData = {
  userId: string;
};

export const getUserApi = async ({
  userId,
}: getUserData): Promise<AxiosResponse<UserType>> => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/${userId}`);
  return res;
};