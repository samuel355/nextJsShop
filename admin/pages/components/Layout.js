import { useSession, signIn, signOut } from "next-auth/react"
import Nav from './Nav';

export default function Layout({children}) {
  const {data: session} = useSession()

  console.log(session)
  if(!session){
    return (
      <div className="bg-blue-900 w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button onClick={() => signIn()} className="bg-white p-2 text-black rounded-lg px-4">Login with Google</button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-blue-900 min-h-screen flex">
      <Nav />
      <div className="bg-white flex-grow mt-1 mr-2 rounded-lg text-black ">
        <div className="mt-3 mx-5">
          <div className="flex justify-between items-center">
            <h4 className="text-black ">Welcome, <span className="text-blue-400 text-xl">{ session?.user?.name}</span> </h4>
            <img className="w-8 h-8 rounded-full" src={session.user.image} alt="User" />
          </div>
          <hr className="my-2" />
          {children}
        </div>
      </div>
    </div>
    
  )
}
