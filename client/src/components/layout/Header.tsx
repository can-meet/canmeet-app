import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { FaRegBell } from "react-icons/fa";
import { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess } from '../../redux/userSlice';

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const location = useLocation();

  const hideNavPaths = ['/login', '/signup'];
  const shouldHideNav = hideNavPaths.includes(location.pathname);
  const isLoggedIn = currentUser !== null;

  return (
    <div className="fixed top-0 w-full bg-white z-20 shadow-sm">
      <div className="flex justify-between items-center px-6 py-2 border-b-[1px]">
        <Link to="/" className='flex items-center'>
          <img alt="logo" src="./logo-canmeet.png" />
        </Link>

        {shouldHideNav ? null : isLoggedIn ? (
          <Button
            type="button"
            className="w-[80px] h-[25px] bg-stone-300 opacity-90 hover:bg-stone-400 hover:opacity-85"
            onClick={() => dispatch(logoutSuccess())}
          >
            ログアウト
          </Button>
        ) : (
          <nav className="flex gap-4 items-center">
            <Button
              type="button"
              className="w-[80px] h-[25px] bg-stone-300 opacity-90 hover:bg-stone-400 hover:opacity-85"
              onClick={() => navigate('/login')}
            >
              ログイン
            </Button>
            <Button
              type="button"
              className="w-[80px] h-[25px] bg-stone-300 opacity-90 hover:bg-stone-400 hover:opacity-85"
              onClick={() => navigate('/signup')}
            >
              新規登録
            </Button>
          </nav>
        )}


        <div className="pl-9">
          <FaRegBell className="text-lg" />
        </div>
      </div>
    </div>
  )
}