import { Link, useLocation, useParams } from "react-router-dom";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import { MdHomeFilled } from "react-icons/md";
import { FaCamera, FaUser } from "react-icons/fa";

export const Footer = () => {
  const location = useLocation();
  const { rid } = useParams();

  return (
    <>
      {location.pathname === `/rooms/${rid}` ? (
        null
      ) : (
        <footer className="fixed bottom-0 w-full bg-white z-10 border-t">
          <div className="flex justify-between items-center px-11 pt-6 pb-9 max-w-96 mx-auto">
            <Link to="/">
              {location.pathname === '/' ? <MdHomeFilled className="text-3xl" /> : <MdHomeFilled className="text-3xl text-secondary-gray  hover:text-default-black/80" />}
            </Link>
            <Link to="/product/create">
              {location.pathname === '/product/create' ? <FaCamera className="text-2xl" /> : <FaCamera className="text-2xl text-secondary-gray hover:text-default-black/80" />}
            </Link>
            <Link to="/rooms">
              {location.pathname.startsWith('/rooms')  ? <PiPaperPlaneRightFill className="text-2xl" /> : <PiPaperPlaneRightFill className="text-2xl text-secondary-gray hover:text-default-black/80" />}
            </Link>
            <Link to="/profile">
              {location.pathname === '/profile' ? <FaUser className="text-xl" /> : <FaUser className="text-xl text-secondary-gray hover:text-default-black/80" />}
            </Link>
          </div>
        </footer>
    ) }
    </>
  )
}