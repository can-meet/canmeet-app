import errorImage from '/404.png'

export const NotFound = () => {
  return (
    <div className='flex flex-col items-center gap-4 mt-32'>
      <h3 className='text-2xl font-bold font-mono'>404</h3>
      <img src={errorImage} alt='404 Error' className='w-28' />
      <p className='font-semibold text-lg'>page is not found</p>
    </div>
  )
}
