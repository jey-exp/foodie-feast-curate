import { useState } from 'react'
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
    description : string
}
  

const ConfirmationModal = ({onSelect, modalTitle, description} : confirmModalProp) => {
    const [open, setOpen] = useState(true);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
        <DialogHeader>
            <DialogTitle>{modalTitle}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className='flex gap-3 items-center'>
            <Button onClick={()=>onSelect("yes")}>Redirect</Button>
            <Button onClick={()=>onSelect("no")}>Logout</Button>
        </div>
        </DialogContent>
    </Dialog>
  )
}

export default ConfirmationModal