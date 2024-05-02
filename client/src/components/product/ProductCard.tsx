import type { Product } from "@/types/product";
import { Link } from "react-router-dom";

type ProductCardProps = {
	product: Product;
};

export const ProductCard = ({ product }: ProductCardProps) => {
	return (
		<Link to={`/product/${product._id}`}>
			<div className="border relative ">
				<img src={product.image} alt="product image" className="w-28 h-28" />
				{product.price >= 100 ? (
					<div>
						<p className="absolute bottom-1.5 left-2 z-10 text-sm">
							${product.price}
						</p>
						<div className="absolute left-1.5 bottom-0.5 border-price-gray w-10 h-7 bg-price-gray opacity-95 rounded-lg"></div>
					</div>
				) : product.price >= 10 ? (
					<div>
						<p className="absolute bottom-1.5 left-2.5 z-10 text-sm">
							${product.price}
						</p>
						<div className="absolute left-1.5 bottom-0.5 border-price-gray w-9 h-7 bg-price-gray opacity-95 rounded-lg"></div>
					</div>
				) : (
					<div>
						<p className="absolute bottom-1.5 left-2.5 z-10 text-sm">
							${product.price}
						</p>
						<div className="absolute left-1.5 bottom-0.5 border-price-gray w-7 h-7 bg-price-gray opacity-95 rounded-lg"></div>
					</div>
				)}

				{product.sale_status === "売り出し中" ? (
					<div>
						<p className="absolute top-1 right-0.5 z-10 text-sm">売り出し</p>
						<div className="absolute top-0 right-0 border-sale w-20 h-20 bg-sale opacity-95 clip-path"></div>
					</div>
				) : product.sale_status === "取引中" ? (
					<div>
						<p className="absolute top-1 right-0.5 z-10 text-sm">取引中</p>
						<div className="absolute top-0 right-0 border-in-trade w-20 h-20 bg-in-trade opacity-95 clip-path"></div>
					</div>
				) : (
					<div>
						<p className="absolute top-1 right-0.5 z-10 text-sm">売り切れ</p>
						<div className="absolute top-0 right-0 border-sold-out w-20 h-20 bg-sold-out opacity-95 clip-path"></div>
					</div>
				)}
			</div>
		</Link>
	);
};
