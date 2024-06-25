import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/header/Header'
import { Outlet } from 'react-router'

export const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}
