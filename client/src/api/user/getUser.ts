import type { UserType } from '@/types/user'
import axios, { type AxiosResponse } from 'axios'

type getUserData = {
  userId: string
}

export const getUserApi = async ({
  userId,
}: getUserData): Promise<AxiosResponse<UserType>> => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/${userId}`)
  return res
}
