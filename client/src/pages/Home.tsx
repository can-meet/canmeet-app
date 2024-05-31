import { Loading } from "@/components/layout/loading/Loading";
import { SearchBar } from "@/components/layout/search/SearchBar";
import { ProductList } from "@/components/product/ProductList";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/types/product";
import { Modal } from "@/components/layout/Modal";
import registerImage from "/register-account-completed.png";
import editCompleteImage from "/edit-product-completed.png";
import deleteCompleteImage from "/delete-product-post.png";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from 'react-query';
import { Button } from "@/components/ui/button";


export const Home = () => {
	const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
	const location = useLocation();
	const [modalType, setModalType] = useState<string | null>(null);
	const [searchParams] = useSearchParams();
	const query = searchParams.get("q") || "";

	const fetchProducts = async () => {
		const response = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
		return response.data;
	};

	const { data: products, isLoading } = useQuery(['products'], fetchProducts, {
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });

	const filteredProducts = useMemo(() => {
    if (!products) return [];
		if (!query) return products;
    return products.filter((product: Product) =>
      product.product_name.toLowerCase().includes(query.toLowerCase())
    );
  }, [products, query]);

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
          link: '/profile',
          btnText: 'マイページに戻る',
        };
      default:
        return {};
    }
  };
	const modalProps = getModalProps();

	if (isLoading) {
		return <Loading />;
	}

	return (
		<>
			<div className="mt-20 mb-16">
				<div className="flex flex-col items-center gap-1 px-4">
					<SearchBar />
					{filteredProducts.length !== 0 ? (
						<div>
							<h2 className="my-4 text-xs text-start font-medium">最近投稿された商品</h2>
							<ProductList products={filteredProducts} />
						</div>
					) : (
						<div className='flex flex-col gap-2 items-center pt-16'>
							<p className='font-bold'>お探しの商品は見つかりませんでした</p>
							<p>再度条件を設定するか、下のボタンでホームへ戻ってください。</p>
							<Button
								type="button"
								className="w-28 font-semibold text-default-white bg-secondary-blue hover:bg-primary-blue"
								onClick={() => navigate("/")}
							>
								ホームへ戻る
							</Button>
						</div>
					)}
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
