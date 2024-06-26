import axios, { AxiosResponse } from 'axios';
import { UserType } from '@/types/user';

type SignUpData = {
  email: string;
  password: string;
  username: string;
  profilePicture: string | null;
};

export const signUpApi = async ({
  email,
  password,
  username,
  profilePicture,
}: SignUpData): Promise<AxiosResponse<UserType>> => {
  const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, { email, password, username, profilePicture });
  return res;
};