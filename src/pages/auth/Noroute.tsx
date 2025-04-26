import SupaBase from '@/lib/zustand';
import  { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner';
import {BeatLoader} from "react-spinners"

const Noroute = () => {
  const supa = SupaBase((state)=>state.supaObj);
  const [showUi, setShowUi] = useState<boolean>(false);

    const navigate = useNavigate();
    useEffect(()=>{
      try {
        const checkSession = async ()=>{
          const { data: { user } } = await supa.auth.getUser()
          setTimeout(() => {
            if(!user){
              setShowUi(true);
            }
          }, 0);
        }
        checkSession()
      } catch (error) {
        console.error("Error in validating session : ", error);
        toast.error("Unexpected error");
      }
    })
    const handleRoute = ()=>{
        navigate("/auth/login");
    }
    return showUi ? (
      <div className='flex w-screen h-screen items-center justify-center bg-orange-100'>
        <div className='space-y-2'>
          <h1 className='text-5xl text-black'>Not authenticated</h1>
          <h1 onClick={handleRoute} className='cursor-pointer font-bold bg-orange-500 text-center rounded-lg py-3 text-white'>
            Go to login
          </h1>
        </div>
      </div>
    ) : (
      <div className='w-screen h-screen flex justify-center items-center bg-orange-100'>
        <div>
            <BeatLoader color='#2d2d2d' size={40} />
        </div>
      </div>
    )
  
}

export default Noroute