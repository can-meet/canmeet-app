import { ProductType } from "@/types/product";
import { ProductCard } from "./ProductCard";

type ProductList = {
	products: ProductType[];
};

export const ProductList = ({ products }: ProductList) => {
	return (
		<ul className="grid grid-cols-3 gap-4 mb-8">
			{products.map((product: ProductType) => (
				<ProductCard key={product._id} product={product} />
			))}
		</ul>
	);
};
