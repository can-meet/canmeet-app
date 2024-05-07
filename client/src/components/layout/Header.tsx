import type { RootState } from "@/redux/store";
import { FaRegBell } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useEffect } from "react";
import { useNotificationsStore } from "@/store/notificationsStore";

export const Header = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const location = useLocation();
  const hideNavPaths = ["/login", "/signup"];
  const shouldHideNav = hideNavPaths.includes(location.pathname);
  const isLoggedIn = currentUser !== null;

  const { notifications, fetchNotifications } = useNotificationsStore();

  useEffect(() => {
    if (currentUser) {
      fetchNotifications(currentUser._id);
    }
  }, []);

  const getLinkText = () => {
    if (!isLoggedIn) return null;

    switch (location.pathname) {
      case "/rooms":
        return "メッセージ";
      case "/notifications":
        return "通知";
      default:
        return null;
    }
  };

  const linkText = getLinkText();

  return (
    <div className="fixed top-0 w-full bg-white z-20 shadow-sm">
      <div className="flex justify-between items-center px-6 py-2 border-b-[1px]">
        <Link to="/" className="flex items-center">
          <img alt="logo" src="./logo-canmeet.png" />
        </Link>
        {shouldHideNav ? null : (
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                {linkText && <div className='text-lg font-semibold'>{linkText}</div>}
              </>
            ) : (
              <nav className="flex gap-4 items-center">
                <Button
                  type="button"
                  className="w-[80px] h-[25px] bg-stone-300 opacity-90 hover:bg-stone-400 hover:opacity-85"
                  onClick={() => navigate("/login")}
                >
                  ログイン
                </Button>
                <Button
                  type="button"
                  className="w-[80px] h-[25px] bg-stone-300 opacity-90 hover:bg-stone-400 hover:opacity-85"
                  onClick={() => navigate("/signup")}
                >
                  新規登録
                </Button>
              </nav>
            )}
          </div>
        )}
        <div className="pl-9 relative">
          <button
            type='button'
            onClick={() => navigate("/notifications")}
          >
            <FaRegBell className="text-lg mt-2" />
          </button>
          {notifications.length > 0 && (
            <div className='absolute top-1.5 -right-0.5 bg-red-500 w-1.5 h-1.5 rounded-full'></div>
          )} 
        </div>
      </div>
    </div>
  );
};