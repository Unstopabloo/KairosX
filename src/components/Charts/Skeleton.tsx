export const ChartsSkeleton = () => {
  return (
    <div className='bg-[#151616] flex flex-col items-center gap-20 border border-white/30 h-full rounded-lg p-6'>
      <div className="flex gap-10">
        <div className='flex flex-col items-center gap-10 w-1/2'>
          <h2>Ingresos</h2>
          <div className='h-72 w-72 bg-slate-600 animate-pulse rounded-full'></div>
        </div>
        <div className='w-1/2'>
          <div className="flex flex-col items-center gap-10">
            <h2>Gastos</h2>
            <div className='h-72 w-72 bg-slate-600 animate-pulse rounded-full'></div>
          </div>
        </div>
      </div>
      <div className="w-full flex items-start justify-between rounded-md p-4 h-52 gap-10 bg-slate-700 animate-pulse">
        <div className="text-black">Consejo financiero</div>
        <div className="w-72 h-6 rounded-md bg-slate-600 animate-pulse"></div>
      </div>
    </div>
  )
}