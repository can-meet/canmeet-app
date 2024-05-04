import { Loading } from "@/components/layout/Loading";
import { SearchBar } from "@/components/layout/SearchBar";
import { ProductList } from "@/components/product/ProductList";
import axios from "axios";
import { useEffect, useState } from "react";
import type { Product } from "../../../server/models/productModel";
import { Modal } from "@/components/layout/Modal";
import registerImage from "/register-account-completed.png";
import editCompleteImage from "/edit-product-completed.png";
import deleteCompleteImage from "/delete-product-post.png";
import { useLocation } from "react-router-dom";

export const Home = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [products, setProducts] = useState<Product[]>([]);
	const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
	const location = useLocation();
	const [modalType, setModalType] = useState<string | null>(null);
	

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				setLoading(true);
				const response = await axios.get(
					`${import.meta.env.VITE_API_URL}/products`,
				);
				setProducts(response.data);
				setFilteredProducts(response.data);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching products:", error);
				setLoading(false);
			}
		};
		fetchProducts();
	}, []);

	useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const showModalParam = queryParams.get('showModal');
    const modalTypeParam = queryParams.get('modalType');

    if (showModalParam === 'true') {
      setIsModalOpen(true);
      setModalType(modalTypeParam);
    } else {
      setIsModalOpen(false);
      setModalType(null);
    }
  }, [location.search]);

	const getModalProps = () => {
    switch (modalType) {
      case 'registration':
        return {
          heading: 'Can Meet へようこそ！',
          img: `${registerImage}`,
          text: 'あなたのカナダでの生活をより良くするフリマアプリです。あなたに素敵な出会いがありますように！',
          link: '/',
          btnText: '早速出品されている商品を見る',
        };
      case 'editComplete':
        return {
          heading: '編集が完了しました！',
          img: `${editCompleteImage}`,
          text: '商品の編集が完了しました！自分の編集した商品を見てみましょう。',
          link: '/',
          btnText: 'たった今編集した商品を見る',
        };
      case 'deleteComplete':
        return {
          heading: '投稿の削除が完了しました！',
          img: `${deleteCompleteImage}`,
          text: '投稿の削除が完了しました！マイページに戻って確認してみましょう。',
          link: '/',
          btnText: 'マイページに戻る',
        };
      default:
        return {};
    }
  };
	const modalProps = getModalProps();

	const getFilteredProducts = (searchQuery: string) => {
		const results = products.filter((product) =>
			product.product_name.toLowerCase().includes(searchQuery.toLowerCase()),
		);
		setFilteredProducts(results);
		setLoading(false);
	};

	if (loading) {
		return <Loading />;
	}

	return (
		<>
			<div className="my-20">
				<div className="flex flex-col items-center gap-1 px-4">
					<SearchBar onSearch={getFilteredProducts} />
					<div>
						<h2 className="my-4 font-semibold">最近投稿された商品</h2>
						<ProductList products={filteredProducts} />
					</div>
				</div>
			</div>
			<Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          {...modalProps}
        />
		</>
	);
};
