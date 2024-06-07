import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import type { RootState } from "@/redux/store";
import { logoutSuccess } from "@/redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Notification } from "@/types/notification";
import Logo from "/logo.png"
import SideMenu from "./SideMenu";
import { FaChevronLeft, FaRegBell } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import axios from "axios";


export const Header = () => {
  const { pid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const location = useLocation();
  const isLoggedIn = currentUser !== null;
  const [unreadNotifications, setUnreadNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (currentUser) {
      const fetchUnreadNotifications = async () => {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/notifications/unread/${currentUser._id}`);
        const data = await response.data;
        setUnreadNotifications(data);
      }
      fetchUnreadNotifications();
    }
  }, []);

  const handleLogout = async () => {
    dispatch(logoutSuccess());
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-default-white w-full z-50 shadow-sm border-b">
      <div className="max-w-96 mx-auto px-1">
        {isLoggedIn && location.pathname === "/rooms" ? (
          <div className="flex justify-between items-center py-2 mx-4">
            <Link
              to="/" 
              className="flex items-center"
            >
              <img alt="logo" src={Logo} className="w-12" />
            </Link>
            <h3 className="text-lg font-semibold">メッセージ</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-4">
                <div className=" relative">
                  <button type="button" onClick={() => navigate("/notifications")}>
                    <FaRegBell className="text-lg mt-2 hover:opacity-80" />
                  </button>
                  {unreadNotifications.length > 0  && (
                    <div className="absolute top-1.5 -right-0.5 bg-primary-red w-1.5 h-1.5 rounded-full"></div>
                  )}
                </div>
              </div>
              <SideMenu handleLogout={handleLogout} isLoggedIn={isLoggedIn} />
            </div>
          </div>
        ) : isLoggedIn ? (
          <div className="flex justify-between items-center py-2 mx-4">
            <Link to="/" className="flex items-center">
              <img alt="logo" src={Logo} className="w-12" />
            </Link>
            <div className="flex gap-4">
              <div className="flex items-center gap-4">
                <div className=" relative">
                  <button type="button" onClick={() => navigate("/notifications")}>
                    <FaRegBell className="text-lg mt-2 hover:opacity-80" />
                  </button>
                  {unreadNotifications.length > 0 && (
                    <div className="absolute top-1.5 -right-0.5 bg-primary-red w-1.5 h-1.5 rounded-full"></div>
                  )}
                </div>
              </div>
              <SideMenu handleLogout={handleLogout} isLoggedIn={isLoggedIn} />
            </div>

            </div>
          ) : (isLoggedIn && location.pathname === "/product/create") 
          || (isLoggedIn && location.pathname === `/product/edit/${pid}`)
          || (isLoggedIn && location.pathname === "/notifications") ? (
            <div className="flex justify-between items-center py-2">
              <button className="text-lg" onClick={() => navigate(-1)}>
                <FaChevronLeft />
              </button>
              <div className="text-lg font-semibold">
                {location.pathname === "/product/create"
                  ? "新規投稿"
                  : location.pathname === `/product/edit/${pid}`
                  ? "投稿の編集"
                  : "通知"}
              </div>
              <div></div>
          </div>
          ) : (
            <div className="flex justify-between items-center py-2 mx-4">

              <Link to="/" className="flex items-center">
                <img alt="logo" src={Logo} className="w-12" />
              </Link>

              <nav className="flex gap-4 items-center">
                <Button
                  type="button"
                  className="w-20 h-6 font-semibold bg-search-history-gray hover:bg-primary-gray"
                  onClick={() => navigate("/login")}
                >
                  ログイン
                </Button>
                <Button
                  type="button"
                  className="w-20 h-6 font-semibold text-default-white bg-secondary-blue hover:bg-primary-blue"
                  onClick={() => navigate("/signup")}
                >
                  新規登録
                </Button>
              </nav>

              <div className="flex gap-4">

                <div className="flex items-center gap-4">
                  {isLoggedIn && location.pathname !== "/notifications" && (
                    <div className=" relative">
                      <button type="button" onClick={() => navigate("/notifications")}>
                        <FaRegBell className="text-lg mt-2 hover:opacity-80" />
                      </button>
                      {unreadNotifications.length > 0 && (
                        <div className="absolute top-1.5 -right-0.5 bg-primary-red w-1.5 h-1.5 rounded-full"></div>
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
  );
};