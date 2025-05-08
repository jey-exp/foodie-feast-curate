import SupaBase from '@/lib/zustand';
import  { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner';
import {BeatLoader} from "react-spinners"
import { MultiStepLoaderDemo } from '@/components/ui/MultistepLoaderDemo';
import { Button } from '@/components/ui/button';

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
          }, 2000);
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
    const loadingStates = [
      { text: "Collecting credentials" },
      { text: "Verifing your request" },
      { text: "Authenticating session" },
      { text: "Performing checksum" },
    ];
    
    return showUi ? (
      <div className='flex w-screen h-screen items-center justify-center bg-gradient-to-br from-orange-50 to-amber-100 relative'>
  {/* Noisy texture overlay */}
  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0D0iMTAwJSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNyIgbnVtT2N0YXZlcz0iNCIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==')]"></div>

  {/* Glassmorphic card */}
  <div className='relative bg-white/20 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/30 transform transition-all hover:scale-[1.02]'>
    {/* Dot grid texture */}
    <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(#00000010_1px,transparent_1px)] bg-[size:16px_16px] opacity-20"></div>
    
    <div className='space-y-6 relative z-10'>
      <div className='space-y-2'>
        <h1 className='text-4xl font-bold text-slate-800 tracking-tight'>
          401 Unauthorized
        </h1>
        <p className='text-slate-600/90 font-medium'>
          You need to authenticate to access this page
        </p>
      </div>

      <Button 
        onClick={handleRoute}
        className='w-full backdrop-blur-md px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-2'
      >
        <span>Continue to Login</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
        </svg>
      </Button>
    </div>
  </div>
</div>
    ) : (
      <div>
        <MultiStepLoaderDemo loaders={loadingStates} isloading={!showUi}/>
      </div>
    )
  
}

export default Noroute