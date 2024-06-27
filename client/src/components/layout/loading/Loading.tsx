import { FadeLoader } from 'react-spinners'

export const Loading = () => {
  return (
    <div className='flex flex-col items-center justify-center mt-28'>
      <FadeLoader color='#a2a5a4' />
    </div>
  )
}
