import type { Product } from '@/types/product'
import { Link } from 'react-router-dom'

type ProductCardProps = {
  product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link to={`/products/${product._id}`}>
      <div className='relative'>
        <img
          src={product.images[0]}
          alt='product'
          className='w-28 h-28 object-cover rounded'
        />
        <div>
          <p className='font-semibold absolute bottom-1 left-1 z-10 text-sm bg-price-gray/80 rounded-md py-0.5 px-1.5'>
            ${product.price}
          </p>
        </div>

        {product.sale_status === '売り出し中' ? (
          <div>
            <p className='absolute top-2 right-1 z-10 text-xs'>売り出し</p>
            <div className='absolute rounded-tr top-0 right-0 border-sale w-20 h-20 bg-sale opacity-95 clip-path' />
          </div>
        ) : product.sale_status === '取引中' ? (
          <div>
            <p className='absolute top-2 right-1 z-10 text-xs'>取引中</p>
            <div className='absolute rounded-tr top-0 right-0 border-in-trade w-20 h-20 bg-in-trade opacity-95 clip-path' />
          </div>
        ) : (
          <div>
            <p className='absolute top-2 right-1 z-10 text-xs'>売り切れ</p>
            <div className='absolute rounded-tr top-0 right-0 border-sold-out w-20 h-20 bg-sold-out opacity-95 clip-path' />
          </div>
        )}
      </div>
    </Link>
  )
}
