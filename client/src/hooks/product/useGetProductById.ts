import { getProductById } from '@/api/product/getProductById'
import type { DetailProductType } from '@/types/product'
import { useQuery } from '@tanstack/react-query'


const fetchProductById = async (id: string): Promise<DetailProductType> => {
  const res = await getProductById(id)
  return res.data
}

export const useGetProductById = (pid: string | undefined, initialProduct?: DetailProductType) => {
  const { data: productDetail, isLoading } = useQuery<DetailProductType>({
    queryKey: ['product', pid],
    queryFn: () => {
      if (!pid) throw new Error('Product ID is required')
      return fetchProductById(pid)
    },
    enabled: !!pid && !initialProduct,
    initialData: initialProduct,
    staleTime: 1000 * 60 * 1,
    gcTime: 1000 * 60 * 5,
  })

  return { productDetail, isLoading }
}