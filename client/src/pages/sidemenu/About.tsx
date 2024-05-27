import YuProfileImage from '/alex-unsplash.jpg'
import MarinaProfileImage from '/emma-unsplash.jpg'
import OtohaProfileImage from '/emma-unsplash.jpg'

const About = () => {
  return (
    <div className='mt-16 mb-20 w-96 mx-auto px-4'>
      <div className='mb-40'>
        <h1 className='text-lg font-semibold'>Can Meet とは</h1>
        <p className="text-xs">can meetは、バンクーバーに住むすべての日本人のためのフリマアプリです。海を越えて新しい国で生活を送る日本人の皆さまが、より安心して・より良い価格で、買えるモノ・売れる機会に出会えます（＝can meet）ように！</p>
        <p className='text-xs text-end'>can meet 製作者一同</p>
      </div>
      <div className=''>
        <h1 className='text-lg font-semibold'>アプリ開発者について</h1>
        <p className="text-xs">can meetは、バンクーバーのCICCCで出会ったcoop留学生3人によって開発されました。皆さまのフィードバックを受けて、より良いアプリ運営を行っていきます。今後ともよろしくお願いします！</p>

        <div className='flex gap-x-14 my-10 overflow-x-auto'>
          <div className="flex flex-col text-center">
            <div className='relative w-40 h-40'>
              <img src={YuProfileImage} alt="profile image" className='object-cover rounded-full w-full h-full' />
            </div>
            <p className='font-semibold my-3'>ゆう</p>
            <span className='text-xs font-semibold mb-3'>webデベロッパー</span>
            <p className='text-xs'>ひとことひとことひとことひとことひとことひとことひとことひとこと</p>
          </div>
          <div className="text-center">
            <div className='relative w-40 h-40'>
              <img src={MarinaProfileImage} alt="profile image" className='object-cover rounded-full w-full h-full' />
            </div>
            <p className='font-semibold my-3'>まりな</p>
            <span className='text-xs font-semibold mb-3'>webデベロッパー</span>
            <p className='text-xs'>ひとことひとことひとことひとことひとことひとことひとことひとこと</p>
          </div>
          <div className="text-center">
          <div className='relative w-40 h-40'>
              <img src={OtohaProfileImage} alt="profile image" className='object-cover rounded-full w-full h-full' />
            </div>
            <p className='font-semibold my-3'>おとは</p>
            <span className='text-xs font-semibold mb-3'>UI/UXデザイナー</span>
            <p className='text-xs'>ひとことひとことひとことひとことひとことひとことひとことひとこと</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About