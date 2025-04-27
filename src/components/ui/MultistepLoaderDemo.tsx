import { useState } from "react";
import { MultiStepLoader as Loader } from "./multi-step-loader";

interface MutiLoaderProps {
  loaders : {text : string}[],
  isloading : boolean
}

export function MultiStepLoaderDemo({loaders, isloading} : MutiLoaderProps) {
  const [loading, setLoading] = useState<boolean>(isloading);
  if(loading){
  return (
    <div className="w-full h-[60vh] flex items-center justify-center">
      <Loader loadingStates={loaders} loading={loading} duration={1000} loop={true} />
    </div>
  );
}
else{
  return null;
}
}
