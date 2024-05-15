import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CgMenu } from "react-icons/cg";
import { Link } from "react-router-dom";

type SideMenuProps = {
  handleLogout: () => void;
  isLoggedIn: boolean;
}

const SideMenu = ({ handleLogout, isLoggedIn }: SideMenuProps) => {
  return (
    <>
      <Sheet>
        <SheetTrigger>
          <CgMenu className="text-2xl hover:opacity-80" />
        </SheetTrigger>
        <SheetContent className="bg-default-white w-52 rounded-l-[48px] flex flex-col max-h-screen">
          <SheetHeader className="mt-10 flex-grow">
            <Link to="/tutorial">
              <div className="bg-button-gray pt-2 pb-3 text-center rounded space-y-1">
                <p className="text-xxs">Can Meetを始めて使う方へ</p>
                <h3 className="text-xs font-semibold">使い方ガイド</h3>
              </div>
            </Link>
            <SheetTitle className="text-start py-6">Menu</SheetTitle>
            <SheetDescription className="flex flex-col justify-between h-full mb-14">
              <div className="flex flex-col items-start text-xs font-medium gap-y-4">
                <Link to='/terms-of-service'>利用規約</Link>
                <Link to='/'>プライバシーポリシー</Link>
                <Link to='/about'>About Us</Link>
                <Link to='/contact'>お問い合わせ</Link>
              </div>
              <div>
                {isLoggedIn ? (
                  <button onClick={() => handleLogout()} className="bg-button-gray rounded py-2 px-12 mb-6 w-full">
                    <span className="text-xxs font-semibold">ログアウト</span>
                  </button>
                ) : null}
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default SideMenu