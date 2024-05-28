import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const Contact = () => {
  return (
    <div className='mt-16 mb-20 w-96 mx-auto px-4'>
      <h3 className="font-semibold text-center py-6">お問い合わせ</h3>
      <form action="" className="space-y-3">
        <div>
          <p className="text-xs my-1">お名前</p>
          <Input className="w-full" />
        </div>
        <div>
          <p className="text-xs my-1">メールアドレス</p>
          <Input className="w-full" />
        </div>
        <div>
          <p className="text-xs my-1">お問い合わせ内容</p>
          <Textarea className="border-0.25 border-secondary-gray " />
        </div>
        <Button type="submit" className="w-full">送信</Button>
      </form>
    </div>
  )
}

export default Contact