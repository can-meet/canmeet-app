import errorImage from '/404.png'

type NotFoundProps = {
  text: string
  className?: string
}

const NotFoundComponent = ({
  text,
  className
}: NotFoundProps) => {
  return (
    <>
      <h3 className='text-2xl font-bold font-mono'>404</h3>
      <img src={errorImage} alt='404 Error' className='w-28' />
      <p className={`font-bold ${className}`}>{text}</p>
    </>
  )
}

export default NotFoundComponent