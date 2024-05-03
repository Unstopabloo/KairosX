import { getTotalGastos } from "@/server/Gastos/getGastos"
import { getTotalIngresos } from "@/server/Ingresos/getIngresos"

import { inter } from '@/lib/fonts'
import { MoreVertical, Plus } from 'lucide-react'

import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

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

          <div className="flex flex-col gap-4">
            <div className="flex justify-between text-primary">
              <h3 className="font-semibold text-lg">Meta de ejemplo</h3>
              <MoreVertical size={18} />
            </div>
            <Progress value={93} />
            <Table>
              <TableCaption>Datos de tu meta</TableCaption>
              <TableBody>
                <TableRow>
                  <TableCell>Meta final</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Cantidad actual</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Cantidad restante</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Ultima contribucion</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Promedio de contribuciones</TableCell>
                  <TableCell className="text-right">$250 / mo</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Comienzo</TableCell>
                  <TableCell className="text-right">Mayo 2024</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Fecha de cumplimiento estimada</TableCell>
                  <TableCell className="text-right">Enero 2025</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="flex justify-end">
              <Button>Hacer un pago</Button>
            </div>
          </div>
          <div className="h-[1px] w-full bg-gray-600 my-6"></div>

          <footer>
            <Button className="w-full flex gap-4 bg-transparent text-primary hover:text-black border border-primary">
              <span>Crear nueva meta principal</span>
              <Plus size={18} />
            </Button>
          </footer>
        </section>

        <section className="col-span-4 flex flex-col gap-8 bg-gray-800/80 border border-gray-600 p-4 rounded-md">
          <header>
            <h2 className="font-semibold text-sm">Metas secundarias</h2>
          </header>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between text-primary">
              <h3 className="text-sm">Meta de ejemplo</h3>
              <MoreVertical size={14} />
            </div>

            <Progress value={33} />
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="p-0">Meta final</TableCell>
                  <TableCell className="py-1 text-right">$250.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="p-0">Cantidad actual</TableCell>
                  <TableCell className="py-1 text-right">$250.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="p-0">Cantidad restante</TableCell>
                  <TableCell className="py-1 text-right">$250.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <div className="flex justify-end">
              <Button variant="link" className="text-xs">Hacer un pago</Button>
            </div>
            <div className="h-[1px] w-full bg-gray-600 my-2"></div>
          </div>
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