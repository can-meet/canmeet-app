import type { UserType } from '@/types/user'
import axios, { type AxiosResponse } from 'axios'

type LoginData = {
  email: string
  password: string
}

export const loginApi = async ({
  email,
  password,
}: LoginData): Promise<AxiosResponse<UserType>> => {
  const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
    email,
    password,
  })
  return res
}
