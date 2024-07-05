import type { ProductType } from '@/types/product'
import axios, { type AxiosResponse } from 'axios'


export const getProducts = async (): Promise<AxiosResponse<ProductType[]>> => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`)
  return res
}