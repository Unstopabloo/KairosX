import { Button } from "@/components/ui/button";
import { inter } from "@/lib/fonts";
import { Pen, Trash, Wallet } from "lucide-react";

export default async function ListCard() {
  return (
    <div className='flex justify-between items-center gap-2 bg-[#131313] p-3 border rounded-lg shadow-md'>
      <header className='flex items-center gap-4'>
        <div>
          <Wallet />
        </div>
        <div className='flex flex-col gap-1 text-white/80'>
          <h3 className='text-xs font-semibold'>Nombre ingreso</h3>
          <small className='text-[11px]'>Mentoru</small>
        </div>
      </header>
      <strong className={`font-bold text-lg min-w-32 ${inter.className}`}>
        $900000
      </strong>
      <footer className='flex items-center gap-4 '>
        <Button className='bg-[#0EA68B] hover:bg-[#0EA68B]/80 size-8' size="icon">
          <Pen color='white' size={17} />
        </Button>
        <Button variant="destructive" className='size-8' size="icon">
          <Trash size={17} />
        </Button>
      </footer>
    </div>
  )
}