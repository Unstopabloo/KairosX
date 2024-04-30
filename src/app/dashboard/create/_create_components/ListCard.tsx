import { Button } from "@/components/ui/button";
import { inter } from "@/lib/fonts";
import { Pen, Lamp, Apple, Gamepad2, Shirt, Sprout, FolderKanban, Handshake, Receipt, Bird } from "lucide-react";

import { Badge } from "@/components/ui/badge"

import DeleteButton from "./deleteButton";

interface ListCardProps {
  id: number;
  name: string;
  value: number;
  comes_from: string;
  icon: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  isActive: boolean;
  type: "ingreso" | "gasto";
}

export default async function ListCard({ id, name, value, comes_from, icon, isActive, type }: ListCardProps) {

  return (
    <div className='relative flex justify-between items-center gap-2 bg-[#131313] p-3 border rounded-lg shadow-md max-w-[95%]'>
      {
        isActive && <Badge className="absolute -top-3 -right-5">Fijo</Badge>
      }
      <header className='flex items-center gap-4'>
        <div>
          {icon === 1 && <Lamp />}
          {icon === 2 && <Apple />}
          {icon === 3 && <Gamepad2 />}
          {icon === 4 && <Shirt />}
          {icon === 5 && <Sprout />}
          {icon === 6 && <FolderKanban />}
          {icon === 7 && <Handshake />}
          {icon === 8 && <Receipt />}
          {icon === 9 && <Bird />}
        </div>
        <div className='flex flex-col gap-1 text-white/80'>
          <h3 className='text-xs font-semibold'>{name}</h3>
          <small className='text-[11px]'>{comes_from}</small>
        </div>
      </header>
      <strong className={`font-bold text-lg min-w-32 ${inter.className}`}>
        $ {value}
      </strong>
      <footer className='flex items-center gap-4 '>
        <Button className='bg-[#0EA68B] hover:bg-[#0EA68B]/80 size-8' size="icon">
          <Pen color='white' size={17} />
        </Button>
        {
          type === 'ingreso' ? (<DeleteButton id={id} type="ingreso" />) : (<DeleteButton id={id} type="gasto" />)
        }
      </footer>
    </div>
  )
}