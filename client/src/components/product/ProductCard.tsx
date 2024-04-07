import { Product } from "@/types/product"

type ProductCardProps = {
  product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className='border relative'>
      <img src={product.image} alt='product image' className='w-28 h-28' />
      <p className='absolute bottom-0.5 right-1.5 z-10'>${product.price} {product.product_name}</p>
      <div className='absolute bottom-0 right-0 border-stone-300 w-16 h-16 bg-stone-300 opacity-95 clip-diagonal'></div>
    </div>
  )
}