import { getTotalGastos } from "@/server/Gastos/getGastos"
import { getTotalIngresos } from "@/server/Ingresos/getIngresos"

import { inter } from '@/lib/fonts'
import { Divide, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"

import BigGoal from "./_goals_components/BigGoal"
import SmallGoal from "./_goals_components/SmallGoal"
import AddBigGoal from "./_goals_components/AddBigGoal"
import { Suspense } from "react"

export default async function Goals() {

  const totalIngresos = await getTotalIngresos()
  const totalGastos = await getTotalGastos()

  let resto

  if (totalIngresos && totalGastos) {
    resto = totalIngresos - totalGastos
  } else {
    resto = 0
  }

  const formatedTotalIngresos = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'CLP'
  }).format(Number(totalIngresos))

  const formatedTotalGastos = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'CLP'
  }).format(Number(totalGastos))

  const formatedResto = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'CLP'
  }).format(Number(resto))

  return (
    <div>
      <header className='py-10 flex items-start justify-between'>
        <h1 className='font-bold text-3xl text-primary/90'>Metas financieras</h1>
        <div className='flex gap-6'>
          <div className='min-w-44 flex flex-col gap-4 rounded-md border border-gray-600 bg-gray-800/80 py-3 px-6'>
            <span className='text-white/60 text-sm font-semibold'>Ingresos</span>
            <strong className={`text-white ${inter.className}`}>{formatedTotalIngresos}</strong>
          </div>
          <div className='min-w-44 flex flex-col gap-4 rounded-md border border-gray-600 bg-gray-800/80 py-3 px-6'>
            <span className='text-white/60 text-sm font-semibold'>Gastos</span>
            <strong className={`text-white ${inter.className}`}>{formatedTotalGastos}</strong>
          </div>
          <div className='min-w-44 flex flex-col gap-4 rounded-md border border-gray-600 bg-gray-800/80 py-3 px-6'>
            <span className='text-white/60 text-sm font-semibold'>Resto</span>
            <strong className={`text-white ${inter.className}`}>{formatedResto}</strong>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-10 gap-10 overflow-y-auto min-h-[40rem] max-h-[43rem]">
        <section className="col-span-6 flex flex-col gap-8 bg-gray-800/80 border border-gray-600 p-4 rounded-md">
          <header>
            <h2 className="font-bold">Metas principales</h2>
          </header>
          <BigGoal />
          <footer>
            <AddBigGoal />
          </footer>
        </section>

        <section className="col-span-4 flex flex-col gap-8 bg-gray-800/80 border border-gray-600 p-4 rounded-md">
          <header>
            <h2 className="font-semibold text-sm">Metas secundarias</h2>
          </header>

          <SmallGoal />
          <footer>
            <Button className="w-full flex gap-4 bg-transparent text-primary hover:text-black border border-primary">
              <span>Crear nueva meta principal</span>
              <Plus size={18} />
            </Button>
          </footer>
        </section>
      </div>
    </div>
  )
}