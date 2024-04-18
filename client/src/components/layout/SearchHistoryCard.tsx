

type SearchHistoryCardProps = {
  keyword: string;
}

export const SearchHistoryCard = ({ keyword }: SearchHistoryCardProps) => {
  return (
    <li className='bg-search-history-gray py-1 px-0.5 text-center'>{keyword}</li>
  )
}