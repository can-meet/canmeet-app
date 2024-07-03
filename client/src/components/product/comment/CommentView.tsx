import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import type { CommentType } from '@/types/comment'
import type { DetailProductType } from '@/types/product'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { IoIosArrowDown } from "react-icons/io";
import { ReplyForm } from '../reply/ReplyForm'
import { CommentCardForReply } from './CommentCardForReply'
import { CommentForm } from './CommentForm'
import { CommentList } from './CommentList'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { timeAgo } from '@/lib/timeAgo'

type CommentListProps = {
  product: DetailProductType
}

export const CommentView = ({ product }: CommentListProps) => {
  const [comments, setComments] = useState<CommentType[]>([])
  const [selectedComments, setSelectedComments] = useState<CommentType[]>([])
  const [commentsUpdated, setCommentsUpdated] = useState<boolean>(false)
  const [repliesUpdated, setRepliesUpdated] = useState<boolean>(false)
  const [commentScrollDown, setCommentScrollDown] = useState<boolean>(false)
  const [isInitialMount, setIsInitialMount] = useState(true)
  const [replySelected, setReplySelected] = useState<boolean>(false)
  const productId = product._id

  const toggleReplyForComment = (id?: string) => {
    setReplySelected(!replySelected)
    if (!replySelected) {
      const filteredComments = comments.filter(comment => comment._id === id)
      setSelectedComments(filteredComments)
    }
  }

  // 初めのマウント時とcommentがupdateされた時のみレンダリング
  useEffect(() => {
    const getComments = async () => {
      try {
        if (productId) {
          axios
            .get(
              `${import.meta.env.VITE_API_URL}/comments/products/${productId}`,
            )
            .then(res => {
              setComments(res.data)
              setSelectedComments(res.data)
              setCommentScrollDown(!commentScrollDown)
              setIsInitialMount(false) // 初回マウント時のみtrue,2回目以降false
            })
        }
      } catch (error) {
        console.log(error)
      }
    }
    getComments()
  }, [commentsUpdated, productId])

  return (
    <Drawer onClose={() => setReplySelected(false)}>

      <div className='w-full mb-12'>
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold'>
              {isInitialMount
                ? `コメント (${product.comments.length})`
                : `コメント (${comments.length})`
              }
            </h2>
            {comments.length > 0 && (
              <DrawerTrigger className='mt-0 text-sm flex gap-1 items-center hover:text-slate-800'>
                もっと見る
                <IoIosArrowDown />
              </DrawerTrigger>
            )}
          </div>

          <div className='flex items-center justify-between'>
            <div className='flex gap-4 mb-2 flex-grow'>
              <Avatar className='mt-1 rounded-full object-cover cursor-pointer self-start'>
                <AvatarImage
                  src={
                    comments[comments.length - 1]?.user.profilePicture ||
                    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                  }
                />
                <AvatarFallback>USER IMAGE</AvatarFallback>
              </Avatar>
              <div className='space-y-1 w-full'>
                <p className='text-sm'>{comments[comments.length - 1]?.user.username}</p>
                <div className='w-full bg-search-history-gray p-2 rounded-md space-y-1'>
                  <p className='text-sm break-all'>{comments[comments.length - 1]?.text}</p>
                  <p className='text-sm'>{timeAgo(comments[comments.length - 1]?.createdAt)}</p>
                </div>
              </div>
            </div>
          </div>

          <DrawerTrigger className='w-full'>
            <Button className='w-full border border-primary-red text-primary-red bg-primary-white hover:bg-slate-100'>コメントする</Button>
          </DrawerTrigger>
        </div>
      </div>
      

      <DrawerContent className='bg-white'>
        <DrawerHeader className='border-primary-gray border-b relative'>
          <DrawerTitle>
            <p className='text-lg font-semibold text-center'>コメント</p>
          </DrawerTitle>

          {/* 返信するボタンを押したら、コメントというタイトルに上にくる */}
          <DrawerTitle
            className={`absolute top-4 left-0 w-full bg-white z-20 transform ${replySelected ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-500`}
          >
            <div className='flex items-center justify-between w-80 mx-auto'>
              <button type='button' onClick={() => toggleReplyForComment()}>
                <IoIosArrowBack className='text-2xl' />
              </button>
              <p className='text-lg font-semibold text-center pr-4.5'>
                リプライ
              </p>
              <span className='w-6' />
            </div>
          </DrawerTitle>
        </DrawerHeader>

        <div
          className={`relative h-full mb-20 overflow-x-hidden flex flex-col ${replySelected ? '' : 'overflow-scroll'}`}
        >
          {!replySelected && (
            <CommentList
              comments={comments}
              toggleReplyForComment={toggleReplyForComment}
            />
          )}
          {/* 返信するボタンを押したら、コメントリストの上指定されたコメントが表示される */}
          {selectedComments.length > 0 && (
            <CommentCardForReply
              comment={selectedComments[0]}
              replySelected={replySelected}
              repliesUpdated={repliesUpdated}
            />
          )}
        </div>


        <DrawerFooter>
          <CommentForm
            productId={productId}
            commentsUpdated={commentsUpdated}
            setCommentsUpdated={setCommentsUpdated}
          />
          {/* 返信するボタンを押したら、コメントフォームの上に表示される */}
          <ReplyForm
            replySelected={replySelected}
            selectedCommentId={selectedComments[0]?._id}
            repliesUpdated={repliesUpdated}
            setRepliesUpdated={setRepliesUpdated}
          />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
