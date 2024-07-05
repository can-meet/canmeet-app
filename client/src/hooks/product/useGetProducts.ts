import { getProducts } from '@/api/product/getProducts'
import type { ProductType } from '@/types/product'
import { useQuery } from '@tanstack/react-query'


const fetchProducts = async (): Promise<ProductType[]> => {
  const res = await getProducts()
  return res.data
}

export const useGetProducts = () => {
  const { data: products, isLoading } = useQuery<ProductType[]>({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 1,
    gcTime: 1000 * 60 * 5,
  });

  return { products: products ?? [], isLoading }
}