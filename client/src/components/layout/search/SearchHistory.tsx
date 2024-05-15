import { SearchHistoryCard } from "./SearchHistoryCard";

type SearchHistoryProps = {
	searchHistory: string[];
};

export const SearchHistory = ({ searchHistory }: SearchHistoryProps) => {
	return (
		<>
			{searchHistory && (
				<div>
					<h3 className="text-start mt-4 p-2 text-md font-medium">
						最近検索したキーワード
					</h3>
					<ul className="grid grid-cols-3 gap-2">
						{searchHistory.map((keyword, index) => (
							<SearchHistoryCard key={index} keyword={keyword} />
						))}
					</ul>
				</div>
			)}
		</>
	);
};
