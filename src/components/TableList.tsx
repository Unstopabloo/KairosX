import H2Card from '@/components/H2Card';

interface TableListProps {
  type: string;
  children: React.ReactNode;
}

export default async function TableList({ type, children }: TableListProps) {
  return (
    <section className='flex flex-col items-start p-6 gap-6 bg-[#151616] border border-white/30 rounded-xl max-h-[380px]'>
      <H2Card text={type} />
      <div className='flex flex-col gap-3 max-h-80 min-h-80 overflow-y-auto overflow-x-hidden pe-7'>
        {children}
      </div>
    </section>
  )
}