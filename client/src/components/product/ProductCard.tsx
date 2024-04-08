import { Product } from "@/types/product"
import { Link } from "react-router-dom"

type ProductCardProps = {
  product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link to={`/product/${product._id}`}>
      <div className='border relative'>
        <img src={product.image} alt='product image' className='w-28 h-28' />
        <p className='absolute bottom-0.5 right-1.5 z-10'>${product.price}</p>
        <div className='absolute bottom-0 right-0 border-stone-300 w-16 h-16 bg-stone-300 opacity-95 clip-path'></div>
      </div>
    </Link>
  )
}