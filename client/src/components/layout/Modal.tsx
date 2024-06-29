import { IoMdClose } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  heading?: string
  img?: string
  text?: string
  link?: string
  btnText?: string
  secondLink?: string
  secondBtnText?: string
  onSecondButtonClick?: () => void
}

export const Modal = ({
  isOpen,
  onClose,
  heading,
  img,
  text,
  link,
  btnText,
  secondLink,
  secondBtnText,
  onSecondButtonClick,
}: ModalProps) => {
  const navigate = useNavigate()
  if (!isOpen) return null

  return (
    <div
      onClick={onClose}
      className='bg-slate-800/50 w-full h-screen mx-auto fixed top-0 left-0 z-50'
    >
      <div
        onClick={event => event.stopPropagation()}
        className='bg-default-white rounded-xl w-80 h-fit-content mx-auto relative top-1/4'
      >
        <button
          onClick={onClose}
          type='button'
          className='absolute top-4 left-4'
        >
          <IoMdClose />
        </button>
        <div className='flex flex-col items-center py-8 gap-3 w-64 mx-auto max-w-72'>
          <h3 className='text-lg font-semibold '>{heading}</h3>
          <img src={img} alt='modal' className='max-w-32' />
          <p className='text-sm'>{text}</p>
          <div className='flex gap-x-2 w-full'>
            <Button
              variant='blue'
              className={`text-default-white text-sm rounded-full ${secondLink ? 'w-full' : 'w-64'} ${btnText === 'キャンセル' && 'bg-slate-100 text-slate-800 hover:bg-slate-200'}`}
              onClick={btnText === 'キャンセル' ? onClose : () => navigate(`${link}`)}
              type='button'
            >
              {btnText}
            </Button>
            {secondLink && (
              <Button
                variant='red'
                className='text-default-white text-sm rounded-full w-full'
                onClick={onSecondButtonClick ? onSecondButtonClick : () => navigate(`${secondLink}`)}
              >
                {secondBtnText}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
