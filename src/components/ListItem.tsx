import H3Card from './H3Card'
import QuantityNumber from './QuantityNumber'
import {
  Lamp,
  Apple,
  Gamepad2,
  Shirt,
  Sprout,
  FolderKanban,
  Handshake,
  Receipt,
  Bird
} from "lucide-react";

interface ListItemProps {
  text: string;
  incomeType: boolean;
  quantity: number;
  icon: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
}


export default async function ListItem({ text, incomeType, quantity, icon }: ListItemProps) {
  return (
    <article className="flex justify-between hover:bg-gray-900 rounded-lg items-center min-w-56 gap-14 w-full p-2">
      <div className='flex gap-3'>
        <header role="icono" className="bg-gray-900 flex justify-center items-center rounded-lg text-white size-12">
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
        </header>
        <div className="flex flex-col justify-center items-start gap-1">
          <H3Card text={text} />
          <small className='font-semibold text-[10px] text-white/80'>{incomeType === true ? 'Activo' : 'Pasivo'}</small>
        </div>
      </div>
      <div className='flex-1 flex justify-end'>
        <QuantityNumber quantity={quantity} />
      </div>
    </article>
  )
}