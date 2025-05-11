import { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import {Button} from "@/components/ui/button";

interface confirmModalProp {
    onSelect : (select : String)=> void,
    modalTitle : string,
    description : string,
    option1 : string,
    options2 : string
}


const ConfirmationModal = ({onSelect, modalTitle, description, option1, options2} : confirmModalProp) => {
  const [open, setOpen] = useState(true);
  useEffect(()=>{
    console.log("Open : ", open);
  },[])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
        <DialogHeader>
            <DialogTitle>{modalTitle}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className='flex gap-3 items-center'>
            <Button onClick={()=>onSelect("option1")}>{option1}</Button>
            <Button onClick={()=>onSelect("option2")}>{options2}</Button>
        </div>
        </DialogContent>
    </Dialog>
  )
}

export default ConfirmationModal