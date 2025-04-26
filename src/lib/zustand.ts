import {create} from "zustand"


const supa = (set, get) =>({
    supaObj: null,
    setSupaObj : (state)=>{
        set(()=>({
            supaObj:state
        }))
    }
})

const SupaBase = create(supa);

export default SupaBase;