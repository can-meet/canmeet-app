import axios, { AxiosResponse } from 'axios';
import { UserType } from '@/types/user';

type GoogleLoginData = {
  username: string | null;
  email: string | null;
  profilePicture: string | null;
};

export const googleLoginApi = async ({
  username,
  email,
  profilePicture,
}: GoogleLoginData): Promise<AxiosResponse<UserType>> => {
  const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/google-login`, { username, email, profilePicture });
  return res;
};