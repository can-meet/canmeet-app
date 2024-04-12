import { MoonLoader } from 'react-spinners';

export const ReplyLoading = () => {
  return (
    <div className='flex flex-col items-center justify-center mt-2 ml-12'>
      <MoonLoader
        color="#a2a5a4"
        size={32}
      />
    </div>
  )
}