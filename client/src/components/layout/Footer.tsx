import { Link, useLocation } from "react-router-dom";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import { IoMdHome } from "react-icons/io";
import { FaCamera, FaUser } from "react-icons/fa";

export const Footer = () => {
  const location = useLocation();
  return (
    <footer className="fixed bottom-0 w-full bg-white z-10">
      <div className="flex justify-around items-center p-3 border-t-[1px]">
        <Link to="/">
          {location.pathname === '/' ? <IoMdHome className="text-2xl text-red-500" /> : <IoMdHome className="text-2xl" />}
        </Link>
        <Link to="/">
          {location.pathname === '/' ? <FaCamera className="text-xl text-red-500" /> : <FaCamera className="text-xl " />}
        </Link>
        <Link to="/rooms">
          {location.pathname.startsWith('/rooms')  ? <PiPaperPlaneRightFill className="text-xl text-red-500" /> : <PiPaperPlaneRightFill className="text-xl" />}
        </Link>
        <Link to="/profile">
          {location.pathname === '/profile' ? <FaUser className="text-lg text-red-500" /> : <FaUser className="text-lg" />}
        </Link>
      </div>
    </footer>
  )
}