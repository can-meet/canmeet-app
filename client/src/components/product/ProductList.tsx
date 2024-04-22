import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";


type ProductList = {
  products: Product[];
}

export const ProductList = ({ products }: ProductList) => {

  return (
    <ul className='grid grid-cols-3 gap-y-4 gap-x-4'>
      {products
        .map((product: Product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
      ))}
    </ul>    
  )
}