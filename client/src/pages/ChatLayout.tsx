import { Footer } from '@/components/layout/Footer'
import { Outlet } from 'react-router'

export const ChatLayout = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  )
}
