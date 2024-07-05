import type { DetailProductType } from '@/types/product'
import axios, { type AxiosResponse } from 'axios'


export const getProductById = async (id: string): Promise<AxiosResponse<DetailProductType>> => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/products/${id}`,
  )
  return res
}