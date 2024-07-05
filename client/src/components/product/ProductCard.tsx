import type { ProductType } from '@/types/product'
import { Link } from 'react-router-dom'

type ProductCardProps = {
  product: ProductType
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link to={`/products/${product._id}`}>
      <div className='relative pointer-events-none'>
        <img
          src={product.images[0]}
          alt='product'
          loading='lazy'
          className='w-28 h-28 object-cover rounded'
        />
        <div>
          <p className='font-semibold absolute bottom-1 left-1 z-10 text-sm bg-price-gray/80 rounded-md py-0.5 px-1.5'>
            ${product.price}
          </p>
        </div>

        {product.sale_status === '取引中' ? (
          <div>
            <div className='absolute inset-0 bg-slate-800/50 rounded' />
            <span className='absolute inset-0 flex items-center justify-center z-10 text-xs text-white font-medium'>
              取引中
            </span>
          </div>
        ) : product.sale_status === '売り切れ' ? (
          <div>
            <div className='absolute inset-0 bg-slate-800/50 rounded' />
            <span className='absolute inset-0 flex items-center justify-center z-10 text-xs text-white font-medium'>
              売り切れ
            </span>
          </div>
        ) : null}
      </div>
    </Link>
  )
}
