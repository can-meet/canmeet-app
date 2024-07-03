import NotFoundComponent from '@/components/layout/NotFound'

export const NotFound = () => {
  return (
    <div className='flex flex-col items-center gap-4 mt-32'>
      <NotFoundComponent
        text='お探しのページが見つかりませんでした。'
        className='text-lg text-semibold'
      />
    </div>
  )
}
