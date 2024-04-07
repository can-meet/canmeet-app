import { SearchBar } from "@/components/layout/SearchBar";
import { ProductList } from "@/components/product/ProductList";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import axios from 'axios';


export const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const getFilteredProducts = (searchQuery: string) => {
    const results = products.filter(product =>
      product.product_name.toLowerCase().includes(searchQuery)
    );
    setFilteredProducts(results);
  }

  return (
    <>
      <div className="my-20">
        <div className="flex flex-col items-center gap-1 px-4">
          <SearchBar
            onSearch={getFilteredProducts}
          />
          <ProductList
            products={filteredProducts}
          />
        </div>
      </div>
    </>
    
  )
}