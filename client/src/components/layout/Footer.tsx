import { Link } from "react-router-dom";
import { PiPaperPlaneRight } from "react-icons/pi";
import { IoMdHome } from "react-icons/io";
import { FaCamera, FaUser } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full bg-white z-10">
      <div className="flex justify-around items-center p-3 border-t-[1px]">
        <Link to="/">
          <IoMdHome className="text-2xl" />
        </Link>
        <FaCamera className="text-xl" />
        <PiPaperPlaneRight className="text-xl" />
        <FaUser className="text-lg" />
      </div>
    </footer>
  )
}