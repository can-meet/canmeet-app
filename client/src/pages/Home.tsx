import { SearchBar } from "@/components/layout/SearchBar";
import { ProductList } from "@/components/product/ProductList";
import { useEffect, useState } from "react";
import { Product } from "../../../server/models/productModel";
import axios from 'axios';
import { Loading } from "@/components/layout/Loading";


export const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
        setProducts(response.data);
        setFilteredProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const getFilteredProducts = (searchQuery: string) => {
    const results = products.filter(product =>
      product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(results);
    setLoading(false);
  }

  if (loading) {
    return (
      <Loading />
    )
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