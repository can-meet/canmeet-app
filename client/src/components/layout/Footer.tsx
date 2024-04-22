import { Link, useLocation } from "react-router-dom";
import { PiPaperPlaneRight, PiPaperPlaneRightFill } from "react-icons/pi";
import { IoMdHome } from "react-icons/io";
import { FaCamera, FaUser } from "react-icons/fa";
import { FiCamera, FiUser } from "react-icons/fi";
import { VscHome } from "react-icons/vsc";

export const Footer = () => {
  const location = useLocation();
  return (
    <footer className="fixed bottom-0 w-full bg-white z-10">
      <div className="flex justify-around items-center p-3 border-t-[1px]">
        <Link to="/">
          {location.pathname === '/' ? <IoMdHome className="text-2xl" /> : <VscHome className="text-2xl" />}
        </Link>
        <Link to="/">
          {location.pathname === '/' ? <FaCamera className="text-xl border-black" /> : <FiCamera className="text-xl" />}
        </Link>
        <Link to="/">
          {location.pathname === '/' ? <PiPaperPlaneRightFill className="text-xl" /> : <PiPaperPlaneRight className="text-xl" />}
        </Link>
        <Link to="/profile">
          {location.pathname === '/profile' ? <FaUser className="text-lg" /> : <FiUser className="text-2xl" />}
        </Link>
      </div>
    </footer>
  )
}