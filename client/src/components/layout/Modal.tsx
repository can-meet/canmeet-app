import { IoMdClose } from "react-icons/io";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  heading?: string;
  img?: string;
  text?: string;
  link?: string;
  btnText?: string;
}

export const Modal = ({
  isOpen,
  onClose,
  heading,
  img,
  text,
  link,
  btnText,
}: ModalProps) => {
  const navigate = useNavigate();
  if(!isOpen) return null
  return (
    <div
      onClick={onClose}
      className="bg-slate-800/50 w-full h-screen mx-auto fixed top-0 left-0 z-50"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="bg-default-white rounded-xl w-80 h-fit-content mx-auto relative top-1/4">
          <button
            onClick={onClose}
            className="absolute top-4 left-4">
            <IoMdClose />
          </button>
          <div className="flex flex-col items-center py-8 gap-3 w-64 mx-auto max-w-72">
            <h3 className="text-lg font-semibold ">{heading}</h3>
            <img src={img} alt="modal image" className="max-w-32" />
            <p className="text-xs">{text}</p>
            <Button 
              variant='blue'
              className="text-default-white text-xs rounded-full w-64"
              onClick={() => navigate(`${link}`)}>
                {btnText}
            </Button>
          </div>
      </div>
    </div>
  )
}