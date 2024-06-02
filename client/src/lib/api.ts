import axios from 'axios';
import { DetailProduct } from '@/types/product';

export const fetchProducts = async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
  return response.data;
};

export const fetchProductById = async (id: string | undefined) => {
  const response = await axios.get<DetailProduct>(`${import.meta.env.VITE_API_URL}/products/${id}`)
  return response.data;
}