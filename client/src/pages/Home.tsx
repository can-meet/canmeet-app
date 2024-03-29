import { Link } from "react-router-dom";


export const Home = () => {
  return (
    <>
      <div className="mt-24">
        <div className="flex flex-col gap-1">
          <h1>HOME</h1>
          <Link className={`btn btn-secondary`} to='/signup'>
            新規登録
          </Link>
          <Link className={`btn btn-secondary`} to='/login'>
            ログイン
          </Link>
        </div>
      </div>
    </>
    
  )
}