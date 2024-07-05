import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store/authStore'
import type { NotificationType } from '@/types/notification'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { FaChevronLeft, FaRegBell } from 'react-icons/fa'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import Logo from '/logo.png'
import SideMenu from './SideMenu'

export const Header = () => {
  const { pid } = useParams()
  const navigate = useNavigate()
  const { currentUser, clearCurrentUser } = useAuthStore()
  const location = useLocation()
  const isLoggedIn = currentUser !== null
  const [unreadNotifications, setUnreadNotifications] = useState<
    NotificationType[]
  >([])

  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [headerOpacity, setHeaderOpacity] = useState(1)
  const [headerPosition, setHeaderPosition] = useState(0)


  const controlHeader = () => {
    const scrollY = window.scrollY
    
    if (scrollY > lastScrollY) {
      // 下にスクロール
      setHeaderOpacity(Math.max(0, headerOpacity - 0.1))
      setHeaderPosition(Math.min(50, headerPosition + 5))
      if (headerOpacity <= 0) {
        setIsHeaderVisible(false);
      }
    } else {
      // 上にスクロール
      setIsHeaderVisible(true)
      setHeaderOpacity(Math.min(1, headerOpacity + 0.1))
      setHeaderPosition(Math.max(0, headerPosition - 5))
    }
    
    setLastScrollY(scrollY)
  };


  useEffect(() => {
    window.addEventListener('scroll', controlHeader)
    return () => {
      window.removeEventListener('scroll', controlHeader)
    };
  }, [lastScrollY, headerOpacity, headerPosition])


  useEffect(() => {
    if (currentUser) {
      const fetchUnreadNotifications = async () => {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/notifications/unread/${currentUser._id}`,
        )
        const data = await response.data
        setUnreadNotifications(data)
      }
      fetchUnreadNotifications()
    }
  }, [currentUser, currentUser?._id])

  const handleLogout = async () => {
    clearCurrentUser()
  }

  return (
    <div 
      className={`fixed top-0 left-0 right-0 bg-default-white w-full z-50 shadow-sm border-b transition-all duration-300 ease-in-out`}
      style={{ 
        opacity: headerOpacity,
        transform: `translateY(${isHeaderVisible ? -headerPosition : -100}px)`
      }}
    >
      <div className='max-w-96 mx-auto px-1'>
        {isLoggedIn && location.pathname === '/rooms' ? (
          <div className='flex justify-between items-center py-2 mx-4'>
            <Link to='/' className='flex items-center'>
              <img alt='logo' src={Logo} className='w-12' />
            </Link>
            <h3 className='text-lg font-semibold'>メッセージ</h3>
            <div className='flex gap-4'>
              <div className='flex items-center gap-4'>
                <div className=' relative'>
                  <button
                    type='button'
                    onClick={() => navigate('/notifications')}
                  >
                    <FaRegBell className='text-lg mt-2 hover:opacity-80' />
                  </button>
                  {unreadNotifications.length > 0 && (
                    <div className='absolute top-1.5 -right-0.5 bg-primary-red w-1.5 h-1.5 rounded-full' />
                  )}
                </div>
              </div>
              <SideMenu handleLogout={handleLogout} isLoggedIn={isLoggedIn} />
            </div>
          </div>
        ) : isLoggedIn ? (
          <div className='flex justify-between items-center py-2 mx-4'>
            <Link to='/' className='flex items-center'>
              <img alt='logo' src={Logo} className='w-12' />
            </Link>
            <div className='flex gap-4'>
              <div className='flex items-center gap-4'>
                <div className=' relative'>
                  <button
                    type='button'
                    onClick={() => navigate('/notifications')}
                  >
                    <FaRegBell className='text-lg mt-2 hover:opacity-80' />
                  </button>
                  {unreadNotifications.length > 0 && (
                    <div className='absolute top-1.5 -right-0.5 bg-primary-red w-1.5 h-1.5 rounded-full' />
                  )}
                </div>
              </div>
              <SideMenu handleLogout={handleLogout} isLoggedIn={isLoggedIn} />
            </div>
          </div>
        ) : (isLoggedIn && location.pathname === '/product/create') ||
          (isLoggedIn && location.pathname === `/product/edit/${pid}`) ||
          (isLoggedIn && location.pathname === '/notifications') ? (
          <div className='flex justify-between items-center py-2'>
            <button
              className='text-lg'
              onClick={() => navigate(-1)}
              type='button'
            >
              <FaChevronLeft />
            </button>
            <div className='text-lg font-semibold'>
              {location.pathname === '/product/create'
                ? '新規投稿'
                : location.pathname === `/product/edit/${pid}`
                  ? '投稿の編集'
                  : '通知'}
            </div>
            <div />
          </div>
        ) : (
          <div className='flex justify-between items-center py-2 mx-4'>
            <Link to='/' className='flex items-center'>
              <img alt='logo' src={Logo} className='w-12' />
            </Link>

            <nav className='flex gap-4 items-center'>
              <Button
                type='button'
                className='w-20 h-6 font-semibold bg-search-history-gray hover:bg-primary-gray'
                onClick={() => navigate('/login')}
              >
                ログイン
              </Button>
              <Button
                type='button'
                className='w-20 h-6 font-semibold text-default-white bg-secondary-blue hover:bg-primary-blue'
                onClick={() => navigate('/signup')}
              >
                新規登録
              </Button>
            </nav>

            <div className='flex gap-4'>
              <div className='flex items-center gap-4'>
                {isLoggedIn && location.pathname !== '/notifications' && (
                  <div className=' relative'>
                    <button
                      type='button'
                      onClick={() => navigate('/notifications')}
                    >
                      <FaRegBell className='text-lg mt-2 hover:opacity-80' />
                    </button>
                    {unreadNotifications.length > 0 && (
                      <div className='absolute top-1.5 -right-0.5 bg-primary-red w-1.5 h-1.5 rounded-full' />
                    )}
                  </div>
                )}
              </div>
              <SideMenu handleLogout={handleLogout} isLoggedIn={isLoggedIn} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
