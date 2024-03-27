import H3Card from './H3Card'
import QuantityNumber from './QuantityNumber'

interface ListItemProps {
  text: string;
  incomeType: 'Activo' | 'Pasivo';
  quantity: number;
}

export default async function ListItem({ text, incomeType, quantity }: ListItemProps) {
  return (
    <article className="flex justify-between hover:bg-stone-900 rounded-lg items-center min-w-56 gap-14 w-full p-2">
      <div className='flex gap-3'>
        <header role="icono" className="bg-stone-900 flex justify-center items-center rounded-lg text-white size-12">
          IC
        </header>
        <div className="flex flex-col justify-center items-start gap-1">
          <H3Card text={text} />
          <small className='font-semibold text-[10px] text-white/80'>{incomeType}</small>
        </div>
      </div>
      <div className='flex-1 flex justify-end'>
        <QuantityNumber quantity={quantity} />
      </div>
    </article>
  )
}