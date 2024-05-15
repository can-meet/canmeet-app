import {
  DrawerHeader,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

type DeleteFormProps = {
  onDelete: (value: boolean) => void;
  onStatusChange: (value: boolean) => void;
}


const DeleteForm = ({ onDelete, onStatusChange }: DeleteFormProps) => {
  const navigate = useNavigate();
  const { pid } = useParams();

  const handleDelete = () => {
    axios.delete(`${import.meta.env.VITE_API_URL}/products/${pid}`)
      .then(() => {
        navigate('/?showModal=true&modalType=deleteComplete');
      })
  }

  return (
    <div className="max-w-96 mx-auto">
      <DrawerHeader className="mb-20">
        <p className="text-xs text-center mt-6 mb-7">投稿の内容はすべて削除され、復元はできません。<br />本当に削除しますか？</p>
        <div className="space-y-4 w-72 mx-auto">
          <Button
            type="button"
            variant="red"
            onClick={handleDelete}
          >
            削除する
          </Button>
          <Button
            type="button"
            onClick={() => {
              onDelete(false);
              onStatusChange(false);
          }}>
            戻る
          </Button>
        </div>
      </DrawerHeader>
    </div>
  )
}

export default DeleteForm