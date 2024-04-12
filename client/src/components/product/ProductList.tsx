import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";


type ProductList = {
  products: Product[];
}

export const ProductList = ({ products }: ProductList) => {

  return (
    <div>
      <h2 className='my-4 font-semibold'>最近投稿された商品</h2>
      <ul className='grid grid-cols-3 gap-y-4 gap-x-4'>
        {products
          .map((product: Product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
        ))}
      </ul>
    </div>
    
  )
}